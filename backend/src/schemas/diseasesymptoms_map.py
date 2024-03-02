from typing import Optional

from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import DiseaseSymptoms_Map


DiseaseSymptomsMapCreateSchema = pydantic_model_creator(
    DiseaseSymptoms_Map, name="DiseaseSymptomsMapCreateSchema", exclude=[""], exclude_readonly=True)
    
DiseaseSymptomsMapOutSchema = pydantic_model_creator(
    DiseaseSymptoms_Map, name="DiseaseSymptomsMapOut", exclude =[
      "modified_at", "created_at"
    ]
)

DiseaseSymptomsMapResponseSchema = pydantic_model_creator(
    DiseaseSymptoms_Map, name="DiseaseSymptomsMapResponse", exclude_readonly=True
)
