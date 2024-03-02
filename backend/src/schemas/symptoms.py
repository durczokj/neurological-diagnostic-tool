from typing import Optional

from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import Symptoms


SymptomCreateSchema = pydantic_model_creator(
    Symptoms, name="SymptomCreateSchema", exclude=["modified_at", "created_at"]
    )

SymptomOutSchema = pydantic_model_creator(
    Symptoms, name="SymptomOutSchema", exclude =[
      "modified_at", "created_at"
    ]
)

SymptomResponseSchema = pydantic_model_creator(
    Symptoms, name="SymptomResponse", exclude_readonly=True
)
