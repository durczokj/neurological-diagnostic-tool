from fastapi import HTTPException
from tortoise.exceptions import DoesNotExist

from src.database.models import DiseaseSymptomsMap
from src.schemas.diseasesymptoms_map import DiseaseSymptomsMapOutSchema
from src.schemas.token import Status


async def get_disease_symptoms_map():
    return await DiseaseSymptomsMapOutSchema.from_queryset(DiseaseSymptomsMap.all())


async def create_disease_symptoms_map(diseasesymptomsmap, current_user) -> DiseaseSymptomsMapOutSchema:
    diseasesymptomsmap_dict = diseasesymptomsmap.dict(exclude_unset=True)
    diseasesymptomsmap_obj = await DiseaseSymptomsMap.create(**diseasesymptomsmap_dict)
    return await DiseaseSymptomsMapOutSchema.from_tortoise_orm(diseasesymptomsmap_obj)


async def update_disease_symptoms_map(diseasesymptomsmap_id, diseasesymptomsmap, current_user) -> DiseaseSymptomsMapOutSchema:
    try:
        db_diseasesymptomsmap = await DiseaseSymptomsMapOutSchema.from_queryset_single(DiseaseSymptomsMap.get(id=diseasesymptomsmap_id))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Disease symptom map {diseasesymptomsmap_id} not found")

    await DiseaseSymptomsMap.filter(id=diseasesymptomsmap_id).update(**diseasesymptomsmap.dict(exclude_unset=True))
    return await DiseaseSymptomsMapOutSchema.from_queryset_single(DiseaseSymptomsMap.get(id=diseasesymptomsmap_id))



async def delete_disease_symptoms_map(diseasesymptomsmap_id, current_user) -> Status:
    deleted_count = await DiseaseSymptomsMap.filter(id=diseasesymptomsmap_id).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail=f"Disease symptom map {diseasesymptomsmap_id} not found")
    return Status(message=f"Deleted disease symptom map {diseasesymptomsmap_id}")
