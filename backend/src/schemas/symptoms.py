from typing import Optional, Literal

from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import Symptoms


SymptomCreateSchema = pydantic_model_creator(
    Symptoms, name="SymptomCreateSchema", exclude=["modified_at", "created_at","diseasesymptomsmaps"]
    )

SymptomOutSchema = pydantic_model_creator(
    Symptoms, name="SymptomOutSchema", exclude =[
      "modified_at", "created_at"
    ]
)

class SymptomResponseSchema(BaseModel):
    name: str
    symmetry_answer: Optional[Literal["symmetric", "assymetric"]]
    severity_answer: Optional[Literal["variable", "persistent"]]
    age_onset_answer: Optional[Literal["newborn", "0-10y", "11-20y", "21-30y"]]
    progressive_answer: Optional[Literal["over_days", "over_months", "over_years"]]
    value_answer: Optional[str]



symptom1 = {
    "name":"ptosis"
}