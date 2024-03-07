from fastapi import APIRouter, Depends, HTTPException
from tortoise.exceptions import DoesNotExist
from tortoise.contrib.fastapi import HTTPNotFoundError
from typing import List
from tortoise.exceptions import IntegrityError
from src.schemas.diseasesymptoms_map import DiseaseSymptomsMapCreateSchema, DiseaseSymptomsMapOutSchema
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
        resp = await DiseaseSymptomsMap.get(id=diseasesymptomsmap_id).prefetch_related('symptom', 'disease', 'characteristic')
        # print json of resp
        return resp
        # return await DiseaseSymptomsMap.get(id=diseasesymptomsmap_id)
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
    

@router.put(
    "/diseasesymptomsmap/{diseasesymptomsmap_id}",
    response_model=DiseaseSymptomsMapOutSchema,
)
async def put_disease_symptoms_map_endpoint(
    diseasesymptomsmap_id: int,
    update_data: DiseaseSymptomsMapCreateSchema,
    current_user: UserOutSchema = Depends(get_current_user),
) -> DiseaseSymptomsMapOutSchema:
    try:
        return await update_disease_symptoms_map(diseasesymptomsmap_id, update_data, current_user)
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail="DiseaseSymptomsMap not found.",
        )
    except IntegrityError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

@router.delete(
    "/diseasesymptomsmap/{diseasesymptomsmap_id}",
    response_model=Status,  # Assuming Status schema indicates success/failure
)
async def delete_disease_symptoms_map_endpoint(
    diseasesymptomsmap_id: int,
    current_user: UserOutSchema = Depends(get_current_user),
) -> Status:
    try:
        await delete_disease_symptoms_map(diseasesymptomsmap_id, current_user)
        return Status(message="DiseaseSymptomsMap deleted successfully.")
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail="DiseaseSymptomsMap not found.",
        )
