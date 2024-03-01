from fastapi import HTTPException
from tortoise.exceptions import DoesNotExist

from src.database.models import Characteristic
from src.schemas.characteristic import CharacteristicOutSchema
from src.schemas.token import Status


async def get_characteristics():
    return await CharacteristicOutSchema.from_queryset(Characteristic.all())


async def create_characteristic(characteristic, current_user) -> CharacteristicOutSchema:
    characteristic_dict = characteristic.dict(exclude_unset=True)
    characteristic_dict["author_id"] = current_user.id
    characteristic_obj = await Characteristic.create(**characteristic_dict)
    return await CharacteristicOutSchema.from_tortoise_orm(characteristic_obj)


async def update_characteristic(characteristic_id, characteristic, current_user) -> CharacteristicOutSchema:
    try:
        db_characteristic = await CharacteristicOutSchema.from_queryset_single(Characteristic.get(id=characteristic_id))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Characteristic {characteristic_id} not found")

    if db_characteristic.author.id == current_user.id:
        await Characteristic.filter(id=characteristic_id).update(**characteristic.dict(exclude_unset=True))
        return await CharacteristicOutSchema.from_queryset_single(Characteristic.get(id=characteristic_id))

    raise HTTPException(status_code=403, detail=f"Not authorized to update")


async def delete_characteristic(characteristic_id) -> Status:
    deleted_count = await Characteristic.filter(id=characteristic_id).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail=f"Characteristic {characteristic_id} not found")
    return Status(message=f"Deleted characteristic {characteristic_id}")
