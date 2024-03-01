from fastapi import APIRouter, Depends, HTTPException
from tortoise.exceptions import DoesNotExist
from tortoise.contrib.fastapi import HTTPNotFoundError
from typing import List

from src.schemas.disease import DiseaseCreateSchema, DiseaseOutSchema
from src.schemas.users import UserOutSchema
from src.database.models import Disease
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
    "/disease/{disease_id}",
    response_model=Status,
    responses={404: {"model": HTTPNotFoundError}},
    dependencies=[Depends(get_current_user)],
)
async def delete_disease_endpoint(
    disease_id: int, current_user: UserOutSchema = Depends(get_current_user)
):
    return await delete_disease(disease_id)
