from typing import Optional

from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import Disease


DiseaseCreateSchema = pydantic_model_creator(
    Disease, name="DiseaseCreateSchema", exclude=["created_at", "modified_at", "diseasesymptomsmaps"])
DiseaseOutSchema = pydantic_model_creator(
    Disease, name="DiseaseOut", exclude =[
      "modified_at", "created_at", "diseasesymptomsmaps"
    ]
)
class DiseaseMatchOutSchema(DiseaseOutSchema):
    matching_symptoms_count: int  # Add the count of matching symptoms
