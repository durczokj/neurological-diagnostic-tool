from typing import Optional

from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import Symptoms


SymptomCreateSchema = pydantic_model_creator(
    Symptoms, name="SymptomCreateSchema", exclude=[""], exclude_readonly=True)
SymptomOutSchema = pydantic_model_creator(
    Symptoms, name="SymptomOut", exclude =[
      "modified_at", "created_at"
    ]
)

SymptomResponseSchema = pydantic_model_creator(
    Symptoms, name="SymptomResponse", exclude_readonly=True
)
