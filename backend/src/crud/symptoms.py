from fastapi import HTTPException
from tortoise.exceptions import DoesNotExist

from src.database.models import Symptoms
from src.schemas.symptoms import SymptomOutSchema
from src.schemas.token import Status


async def get_symptoms():
    return await SymptomOutSchema.from_queryset(Symptoms.all())


async def create_symptom(symptom, current_user) -> SymptomOutSchema:
    symptom_dict = symptom.dict(exclude_unset=True)
    symptom_dict["author_id"] = current_user.id
    symptom_obj = await Symptoms.create(**symptom_dict)
    return await SymptomOutSchema.from_tortoise_orm(symptom_obj)


async def update_symptom(symptom_id, symptom, current_user) -> SymptomOutSchema:
    try:
        db_symptom = await SymptomOutSchema.from_queryset_single(Symptoms.get(id=symptom_id))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Symptom {symptom_id} not found")

    if db_symptom.author.id == current_user.id:
        await Symptoms.filter(id=symptom_id).update(**symptom.dict(exclude_unset=True))
        return await SymptomOutSchema.from_queryset_single(Symptoms.get(id=symptom_id))

    raise HTTPException(status_code=403, detail=f"Not authorized to update")


async def delete_symptom(symptom_id) -> Status:
    deleted_count = await Symptoms.filter(id=symptom_id).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail=f"Symptom {symptom_id} not found")
    return Status(message=f"Deleted symptom {symptom_id}")
