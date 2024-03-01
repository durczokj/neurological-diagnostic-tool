from fastapi import HTTPException
from tortoise.exceptions import DoesNotExist

from src.database.models import DiseaseSymptoms_Map
from src.schemas.diseasesymptoms_map import DiseaseSymptomsMapOutSchema
from src.schemas.token import Status


async def get_disease_symptoms_map():
    return await DiseaseSymptomsMapOutSchema.from_queryset(DiseaseSymptoms_Map.all())


async def create_disease_symptoms_map(diseasesymptomsmap, current_user) -> DiseaseSymptomsMapOutSchema:
    diseasesymptomsmap_dict = diseasesymptomsmap.dict(exclude_unset=True)
    diseasesymptomsmap_dict["author_id"] = current_user.id
    diseasesymptomsmap_obj = await DiseaseSymptoms_Map.create(**diseasesymptomsmap_dict)
    return await DiseaseSymptomsMapOutSchema.from_tortoise_orm(diseasesymptomsmap_obj)


async def update_disease_symptoms_map(diseasesymptomsmap_id, diseasesymptomsmap, current_user) -> DiseaseSymptomsMapOutSchema:
    try:
        db_diseasesymptomsmap = await DiseaseSymptomsOutSchema.from_queryset_single(DiseaseSymptoms_Map.get(id=diseasesymptomsmap_id))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Disease symptom map {diseasesymptomsmap_id} not found")

    if db_diseasesymptomsmap.author.id == current_user.id:
        await DiseaseSymptoms_Map.filter(id=symptom_id).update(**diseasesymptomsmap.dict(exclude_unset=True))
        return await DiseaseSymptomsMapOutSchema.from_queryset_single(DiseaseSymptoms_Map.get(id=diseasesymptomsmap_id))

    raise HTTPException(status_code=403, detail=f"Not authorized to update")


async def delete_disease_symptoms_map(diseasesymptomsmap_id) -> Status:
    deleted_count = await DiseaseSymptoms_Map.filter(id=diseasesymptomsmap_id).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail=f"Disease symptom map {diseasesymptomsmap_id} not found")
    return Status(message=f"Deleted disease symptom map {diseasesymptomsmap_id}")
