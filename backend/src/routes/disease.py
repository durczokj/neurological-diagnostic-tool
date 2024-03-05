from fastapi import APIRouter, Depends, HTTPException
from tortoise.exceptions import DoesNotExist
from tortoise.contrib.fastapi import HTTPNotFoundError
from typing import List

from src.schemas.diseasesymptoms_map import DiseaseSymptomsMapOutSchema
from src.schemas.disease import DiseaseCreateSchema, DiseaseOutSchema
from src.schemas.users import UserOutSchema
from src.database.models import Disease, DiseaseSymptomsMap
from src.crud.disease import get_diseases, create_disease, update_disease, delete_disease
from src.auth.jwthandler import get_current_user
from src.schemas.token import Status

router = APIRouter()

@router.get(
    "/disease",
    response_model=List[DiseaseOutSchema],
)
async def read_diseases():
    return await get_diseases()

@router.get(
    "/disease/{name}",
    response_model=DiseaseOutSchema,
)
async def read_disease(name: str) -> DiseaseOutSchema:
    try:
        return await Disease.get(name=name)
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail="Disease does not exist",
        )

@router.post(
    "/disease", 
    response_model=DiseaseOutSchema, 
)
async def create_disease_endpoint(
    disease: DiseaseCreateSchema, current_user: UserOutSchema = Depends(get_current_user)
) -> DiseaseOutSchema:
    return await create_disease(disease, current_user)

@router.delete(
    "/disease/{name}",
    response_model=Status,
    responses={404: {"model": HTTPNotFoundError}},
    dependencies=[Depends(get_current_user)],
)
async def delete_disease_endpoint(
    name: int, current_user: UserOutSchema = Depends(get_current_user)
):
    return await delete_disease(name)



@router.post(
    "/disease/match",
    response_model=List[DiseaseOutSchema],
)
async def match_diseases_with_symptoms(symptoms: List[DiseaseSymptomsMapOutSchema]) -> List[DiseaseOutSchema]:
    # Convert input symptoms to a format suitable for querying
    symptom_names = [symptom.symptom.name for symptom in symptoms]
    symptom_characteristics = {
        (symptom.symptom.name, symptom.characteristic.name): symptom.characteristic.value
        for symptom in symptoms
        if symptom.characteristic
    }

    # Query for diseases that have a matching symptom map without excluding symptoms
    diseases = await DiseaseSymptomsMap.filter(
        symptom__name__in=symptom_names,
        excluding=False
    ).distinct().prefetch_related('disease')

    matching_diseases = []
    for disease_map in diseases:
        # Check required symptoms
        required_symptoms = await DiseaseSymptomsMap.filter(disease=disease_map.disease, required=True)
        if not all([req.symptom.name in symptom_names for req in required_symptoms]):
            continue

        # Check excluding symptoms
        excluding_symptoms = await DiseaseSymptomsMap.filter(disease=disease_map.disease, excluding=True)
        if any([exc.symptom.name in symptom_names for exc in excluding_symptoms]):
            continue

        # Count matching characteristics
        matching_characteristics = sum(
            1 for (symptom_name, characteristic_name), value in symptom_characteristics.items()
            if await DiseaseSymptomsMap.filter(
                disease=disease_map.disease,
                symptom__name=symptom_name,
                characteristic__name=characteristic_name,
                characteristic__value=value
            ).exists()
        )

        matching_diseases.append((disease_map.disease, matching_characteristics))

    # Order diseases by the number of matching characteristics
    matching_diseases.sort(key=lambda x: x[1], reverse=True)
    
    # Convert to the expected output schema
    result = [await DiseaseOutSchema.from_tortoise_orm(disease[0]) for disease in matching_diseases]
    
    return result