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
    symmetry_answer: Optional[Literal["symetryczny", "asymetryczny", "nie dotyczy"]] = "nie dotyczy"
    variability_answer: Optional[Literal["zmienne", "stałe/postępujące", "nie dotyczy"]] = "nie dotyczy"
    age_onset_answer: Optional[Literal["od urodzenia", "poniżej 10 roku życia", "od 10 do 20 roku życia", "od 20 do 30 roku życia", 
                                       "od 30 do 50 roku życia", "powyżej 50 roku życia", "nie dotyczy"]] = "nie dotyczy"
    exists_in_family_answer: Optional[Literal["tak", "nie", "nie dotyczy"]] = "nie dotyczy"
    ck_level_answer: Optional[Literal["norma", "powyżej normy do 1000", "od 1000 do 10000", "powyżej 10000",
                                "nie dotyczy"]] = "nie dotyczy"
    worsen: Optional[str]

symptom1 = {
    "name":"ptosis"
}