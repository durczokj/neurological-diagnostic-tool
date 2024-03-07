from fastapi import APIRouter, Depends, HTTPException
from src.schemas.disease import DiseaseMatchOutSchema
from tortoise.exceptions import DoesNotExist
from tortoise.contrib.fastapi import HTTPNotFoundError
from tortoise.functions import Count
from typing import List

from src.schemas.symptoms import SymptomCreateSchema, SymptomOutSchema, SymptomResponseSchema
from src.schemas.users import UserOutSchema
from src.database.models import DiseaseSymptomsMap, Symptoms
from src.crud.symptoms import get_symptoms, create_symptom, update_symptom, delete_symptom
from src.auth.jwthandler import get_current_user
from src.schemas.token import Status

router = APIRouter()

@router.get(
    "/symptoms",
    response_model=List[SymptomOutSchema],
)
async def read_symptoms():
    return await get_symptoms()

@router.get(
    "/symptom/{symptom_id}",
    response_model=SymptomOutSchema,
)
async def read_symptom(symptom_name: str) -> SymptomOutSchema:
    try:
        return await Symptoms.get(name=symptom_name)
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail="Symptom does not exist",
        )

@router.post(
    "/symptoms", 
    response_model=SymptomOutSchema, 
)
async def create_symptom_endpoint(
    symptom: SymptomCreateSchema, current_user: UserOutSchema = Depends(get_current_user)
) -> SymptomOutSchema:
    return await create_symptom(symptom, current_user)

@router.patch(
    "/symptom/{symptom_name}",
    response_model=SymptomOutSchema,
    responses={404: {"model": HTTPNotFoundError}, 403: {"description": "Operation not permitted"}},
)
async def update_symptom_endpoint(
    symptom_name: str,
    symptom: SymptomResponseSchema,
) -> SymptomOutSchema:
    return await update_symptom(symptom_name, symptom)

@router.delete(
    "/symptom/{symptom_id}",
    response_model=Status,
    responses={404: {"model": HTTPNotFoundError}},
    dependencies=[Depends(get_current_user)],
)
async def delete_symptom_endpoint(
    symptom_name: str, current_user: UserOutSchema = Depends(get_current_user)
):
    return await delete_symptom(symptom_name)
 

@router.get(
    "/symptom/{symptom_name}/question"
)
async def ask_symptom_question(symptom_name: str):
    return {"message": f"Do you have {symptom_name}?"}


@router.get(
    "/suggestions/symptom/{keyword}"
)
async def get_symptom_suggestions(keyword: str):
    symptoms = await Symptoms.filter(name__icontains=keyword).all()
    return symptoms




@router.post("/symptom/recommend", response_model=SymptomOutSchema)
async def recommend_next_symptom(diseases: List[DiseaseMatchOutSchema], current_symptoms: List[SymptomResponseSchema]) -> SymptomOutSchema:
    # Extract disease names and current symptom names
    # shitty naming practice
    diseases = [disease.name for disease in diseases]
    current_symptoms = [symptom.name for symptom in current_symptoms]
    # Exclude current symptoms and filter by the given diseases
    excluding_symptoms = await DiseaseSymptomsMap.filter(
        disease__name__in=diseases,
        excluding=True
    ).exclude(symptom__name__in=current_symptoms).prefetch_related("symptom").distinct()

    if excluding_symptoms:
        # Return the first symptom that has "excluding" set to true
        return await SymptomOutSchema.from_tortoise_orm(excluding_symptoms[0].symptom)

    # If no "excluding" symptoms are found, look for required symptoms
    required_symptoms = await DiseaseSymptomsMap.filter(
        disease__name__in=diseases,
        required=True
    ).exclude(symptom__name__in=current_symptoms).prefetch_related("symptom").distinct()

    if required_symptoms:
        # Return the first required symptom not in the current list
        return await SymptomOutSchema.from_tortoise_orm(required_symptoms[0].symptom)

    # If no "excluding" or "required" symptoms, recommend based on occurrence in the least number of diseases
    symptom_occurrences = await DiseaseSymptomsMap.annotate(
        count=Count("disease")
    ).filter(
        symptom__name__not_in=current_symptoms
    ).group_by("symptom").order_by("count")

    if symptom_occurrences:
        # Return the symptom occurring in the least number of diseases
        return await SymptomOutSchema.from_tortoise_orm(symptom_occurrences[0].symptom)

    raise HTTPException(status_code=404, detail="No suitable next symptom found.")
