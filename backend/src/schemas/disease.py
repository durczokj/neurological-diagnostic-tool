from typing import Optional

from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import Disease


DiseaseCreateSchema = pydantic_model_creator(
    Disease, name="DiseaseCreateSchema", exclude=["created_at", "modified_at"])
DiseaseOutSchema = pydantic_model_creator(
    Disease, name="DiseaseOut", exclude =[
      "modified_at", "created_at"
    ]
)
