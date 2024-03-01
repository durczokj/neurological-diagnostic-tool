from fastapi import APIRouter, Depends, HTTPException
from tortoise.exceptions import DoesNotExist
from tortoise.contrib.fastapi import HTTPNotFoundError
from typing import List

from src.schemas.symptoms import SymptomCreateSchema, SymptomOutSchema, SymptomResponseSchema
from src.schemas.users import UserOutSchema
from src.database.models import Symptoms
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
