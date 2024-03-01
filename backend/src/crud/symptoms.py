from fastapi import HTTPException
from tortoise.exceptions import DoesNotExist

from src.database.models import Symptoms
from src.schemas.symptoms import SymptomOutSchema
from src.schemas.token import Status


async def get_symptoms():
    return await SymptomOutSchema.from_queryset(Symptoms.all())


async def create_symptom(symptom, current_user) -> SymptomOutSchema:
    symptom_dict = symptom.dict(exclude_unset=True)
    symptom_obj = await Symptoms.create(**symptom_dict)
    return await SymptomOutSchema.from_tortoise_orm(symptom_obj)


async def update_symptom(symptom_name, symptom) -> SymptomOutSchema:
    try:
        db_symptom = await SymptomOutSchema.from_queryset_single(Symptoms.get(name=symptom_name))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Symptom {symptom_name} not found")

    await Symptoms.filter(name=symptom_name).update(**symptom.dict(exclude_unset=True))
    return await SymptomOutSchema.from_queryset_single(Symptoms.get(name=symptom_name))

async def delete_symptom(symptom_name) -> Status:
    deleted_count = await Symptoms.filter(name=symptom_name).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail=f"Symptom {symptom_name} not found")
    return Status(message=f"Deleted symptom {symptom_name}")
