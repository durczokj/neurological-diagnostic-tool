from typing import Optional

from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import DiseaseSymptomsMap


DiseaseSymptomsMapCreateSchema = pydantic_model_creator(
    DiseaseSymptomsMap, name="DiseaseSymptomsMapCreateSchema", exclude=[""], exclude_readonly=True)
    
DiseaseSymptomsMapOutSchema = pydantic_model_creator(
    DiseaseSymptomsMap, name="DiseaseSymptomsMapOut", exclude =[
      "modified_at", "created_at"
    ]
)
