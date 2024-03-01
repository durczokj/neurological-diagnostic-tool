from fastapi import HTTPException
from tortoise.exceptions import DoesNotExist

from src.database.models import Disease
from src.schemas.disease import DiseaseOutSchema
from src.schemas.token import Status


async def get_diseases():
    return await DiseaseOutSchema.from_queryset(Disease.all())


async def create_disease(disease, current_user) -> DiseaseOutSchema:
    disease_dict = disease.dict(exclude_unset=True)
    disease_dict["author_id"] = current_user.id
    disease_obj = await Disease.create(**disease_dict)
    return await DiseaseOutSchema.from_tortoise_orm(disease_obj)


async def update_disease(disease_name, disease, current_user) -> DiseaseOutSchema:
    try:
        db_disease = await DiseaseOutSchema.from_queryset_single(Disease.get(name=disease_name))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Disease {disease_name} not found")

    if db_disease.author.id == current_user.id:
        await Disease.filter(name=disease_name).update(**disease.dict(exclude_unset=True))
        return await DiseaseOutSchema.from_queryset_single(Disease.get(name=disease_name))

    raise HTTPException(status_code=403, detail=f"Not authorized to update")


async def delete_disease(disease_name) -> Status:
    deleted_count = await Disease.filter(name=disease_name).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail=f"Disease {disease_name} not found")
    return Status(message=f"Deleted disease {disease_name}")
