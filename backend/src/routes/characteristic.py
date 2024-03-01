from fastapi import APIRouter, Depends, HTTPException
from tortoise.exceptions import DoesNotExist
from tortoise.contrib.fastapi import HTTPNotFoundError
from typing import List

from src.schemas.characteristic import CharacteristicCreateSchema, CharacteristicOutSchema
from src.schemas.users import UserOutSchema
from src.database.models import Characteristic
from src.crud.characteristic import get_characteristics, create_characteristic, update_characteristic, delete_characteristic
from src.auth.jwthandler import get_current_user
from src.schemas.token import Status

router = APIRouter()

@router.get(
    "/characteristic",
    response_model=List[CharacteristicOutSchema],
)
async def read_characteristics():
    return await get_characteristics()

@router.get(
    "/characteristic/{id}",
    response_model=CharacteristicOutSchema,
)
async def read_characteristic(id: int) -> CharacteristicOutSchema:
    try:
        return await Characteristic.get(id=id)
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail="Characteristic does not exist",
        )

@router.post(
    "/characteristic", 
    response_model=CharacteristicOutSchema, 
)
async def create_characteristic_endpoint(
    characteristic: CharacteristicCreateSchema, current_user: UserOutSchema = Depends(get_current_user)
) -> CharacteristicOutSchema:
    return await create_characteristic(characteristic, current_user)

@router.delete(
    "/characteristic/{characteristic_id}",
    response_model=Status,
    responses={404: {"model": HTTPNotFoundError}},
    dependencies=[Depends(get_current_user)],
)
async def delete_characteristic_endpoint(
    characteristic_id: int, current_user: UserOutSchema = Depends(get_current_user)
):
    return await delete_characteristic(characteristic_id)
