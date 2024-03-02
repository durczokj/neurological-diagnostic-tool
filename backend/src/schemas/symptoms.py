from typing import Optional, Literal

from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import Symptoms


SymptomCreateSchema = pydantic_model_creator(
    Symptoms, name="SymptomCreateSchema", exclude=["modified_at", "created_at", "diseasesymptomsmaps"]
    )

SymptomOutSchema = pydantic_model_creator(
    Symptoms, name="SymptomOutSchema", exclude =[
      "modified_at", "created_at"
    ]
)

class SymptomResponseSchema(BaseModel):
    name: str
    symmetry_answer: Optional[Literal["symetryczne", "asymetryczne"]]
    variability_answer: Optional[Literal["zmienne", "stałe"]]
    age_onset_answer: Optional[Literal["od urodzenia", "poniżej 10 roku życia", "od 10 do 20 roku życia", "od 20 do 30 roku życia", 
                                       "od 30 do 50 roku życia", "powyżej 50 roku życia"]]
    progressive_answer: Optional[Literal["dni", "tygodni", "miesięcy", "lat"]]
    family_answer: Optional[Literal["tak", "nie"]]
    value_answer: Optional[str]



symptom1 = {
    "name":"ptosis"
}