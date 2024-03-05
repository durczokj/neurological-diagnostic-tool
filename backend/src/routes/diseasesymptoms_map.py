from fastapi import APIRouter, Depends, HTTPException
from tortoise.exceptions import DoesNotExist
from tortoise.contrib.fastapi import HTTPNotFoundError
from typing import List
from tortoise.exceptions import IntegrityError
from src.schemas.diseasesymptoms_map import DiseaseSymptomsMapCreateSchema, DiseaseSymptomsMapOutSchema, DiseaseSymptomsMapResponseSchema
from src.schemas.users import UserOutSchema
from src.database.models import DiseaseSymptomsMap
from src.crud.diseasesymptoms_map import get_disease_symptoms_map, create_disease_symptoms_map, update_disease_symptoms_map, delete_disease_symptoms_map
from src.auth.jwthandler import get_current_user
from src.schemas.token import Status

router = APIRouter()

@router.get(
    "/diseasesymptomsmap",
    response_model=List[DiseaseSymptomsMapOutSchema],
)
async def read_disease_symptoms_map_endpoint():
    return await get_disease_symptoms_map()

@router.get(
    "/diseasesymptomsmap/{diseasesymptomsmap_id}",
    response_model=DiseaseSymptomsMapOutSchema,
)
async def read_disease_symptoms_map_endpoint(diseasesymptomsmap_id: int) -> DiseaseSymptomsMapOutSchema:
    try:
        return await DiseaseSymptomsMap.get(id=diseasesymptomsmap_id)
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail="Disease symptom map does not exist",
        )

@router.post(
    "/diseasesymptomsmap", 
    response_model=DiseaseSymptomsMapOutSchema,
    responses={400: {"description": "Bad Request"}}
)
async def create_disease_symptoms_map_endpoint(
    diseasesymptomsmap: DiseaseSymptomsMapCreateSchema, current_user: UserOutSchema = Depends(get_current_user)
) -> DiseaseSymptomsMapOutSchema:
    try:
        return await create_disease_symptoms_map(diseasesymptomsmap, current_user)
    except IntegrityError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
@router.patch(
    "/diseasesymptomsmap/{diseasesymptomsmap_id}",
    response_model=DiseaseSymptomsMapCreateSchema,
    responses={404: {"model": HTTPNotFoundError}, 403: {"description": "Operation not permitted"}},
)
async def update_diseasesymptomsmap_endpoint(
    diseasesymptomsmap_id: int,
    diseasesymptomsmap: DiseaseSymptomsMapCreateSchema,
) -> DiseaseSymptomsMapOutSchema:
    return await update_diseasesymptomsmap(diseasesymptomsmap_id, diseasesymptomsmap)

@router.delete(
    "/diseasesymptomsmap/{diseasesymptomsmap_id}",
    response_model=Status,
    responses={404: {"model": HTTPNotFoundError}},
    dependencies=[Depends(get_current_user)],
)
async def delete_diseasesymptomsmap_endpoint(
    diseasesymptomsmap_id: int, current_user: UserOutSchema = Depends(get_current_user)
):
    return await delete_diseasesymptomsmap(diseasesymptomsmap_id)
