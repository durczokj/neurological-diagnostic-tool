from typing import Optional

from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import Characteristic


CharacteristicCreateSchema = pydantic_model_creator(
    Characteristic, name="CharacteristicCreateSchema", exclude=["created_at", "modified_at"], exclude_readonly = True)
CharacteristicOutSchema = pydantic_model_creator(
    Characteristic, name="CharacteristicOut", exclude =[
      "modified_at", "created_at"
    ]
)
