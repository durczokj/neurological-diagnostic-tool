from fastapi import APIRouter, Depends, HTTPException
from src.schemas.symptoms import SymptomResponseSchema
from tortoise.exceptions import DoesNotExist
from tortoise.contrib.fastapi import HTTPNotFoundError
from tortoise.queryset import Q
from typing import List

from src.schemas.diseasesymptoms_map import DiseaseSymptomsMapOutSchema
from src.schemas.disease import DiseaseCreateSchema, DiseaseMatchOutSchema, DiseaseOutSchema
from src.schemas.users import UserOutSchema
from src.database.models import Disease, DiseaseSymptomsMap
from src.crud.disease import get_diseases, create_disease, update_disease, delete_disease
from src.auth.jwthandler import get_current_user
from src.schemas.token import Status

router = APIRouter()

@router.get(
    "/disease",
    response_model=List[DiseaseOutSchema],
)
async def read_diseases():
    return await get_diseases()

@router.get(
    "/disease/{name}",
    response_model=DiseaseOutSchema,
)
async def read_disease(name: str) -> DiseaseOutSchema:
    try:
        return await Disease.get(name=name)
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail="Disease does not exist",
        )

@router.post(
    "/disease", 
    response_model=DiseaseOutSchema, 
)
async def create_disease_endpoint(
    disease: DiseaseCreateSchema, current_user: UserOutSchema = Depends(get_current_user)
) -> DiseaseOutSchema:
    return await create_disease(disease, current_user)

@router.delete(
    "/disease/{name}",
    response_model=Status,
    responses={404: {"model": HTTPNotFoundError}},
    dependencies=[Depends(get_current_user)],
)
async def delete_disease_endpoint(
    name: int, current_user: UserOutSchema = Depends(get_current_user)
):
    return await delete_disease(name)

async def print_diseases_query_set(diseases):
    diseases_data = []
    for disease_map in diseases:
        disease = disease_map.disease  # Assuming `disease` is a related object you want to include
        symptom = await disease_map.symptom  # You need to fetch related objects like this if they are not already prefetched
        disease_data = {
            "DiseaseSymptomsMap ID": disease_map.id,
            "Disease Name": disease.name if disease else None,
            "Symptom Name": symptom.name if symptom else None,
            # Add more fields here as needed
        }
        diseases_data.append(disease_data)
    print("DiseaseSymptomsMap Objects:", diseases_data)


@router.post(
    "/disease/match",
    response_model=List[DiseaseMatchOutSchema],
)
async def match_diseases_with_symptoms(symptoms: List[DiseaseSymptomsMapOutSchema]) -> List[DiseaseMatchOutSchema]:
    # Prepare a list of tuples for symptom names and characteristics for querying
    symptom_with_characteristics = [
        (symptom.symptom.name, symptom.characteristic.name, symptom.characteristic.value)
        for symptom in symptoms
        if symptom.characteristic  # Ensure symptom has a characteristic
    ]

    # Initialize a dictionary to hold matching characteristic counts per disease
    disease_matching_count = {}

    for symptom_name, characteristic_name, characteristic_value in symptom_with_characteristics:
        # Query for matching diseases based on symptom and its characteristic
        matches = await DiseaseSymptomsMap.filter(
            symptom__name=symptom_name,
            characteristic__name=characteristic_name,
            characteristic__value=characteristic_value,
            excluding=False
        ).prefetch_related('disease')

        for match in matches:
            # Update count for each disease found
            if match.disease.name not in disease_matching_count:
                disease_matching_count[match.disease.name] = {'disease': match.disease, 'count': 1}
            else:
                disease_matching_count[match.disease.name]['count'] += 1

    sorted_diseases = sorted(disease_matching_count.values(), key=lambda x: x['count'], reverse=True)

    # Convert sorted diseases to the new output schema, including the count
    result = [
        DiseaseMatchOutSchema(
            **(await DiseaseOutSchema.from_tortoise_orm(entry['disease'])).dict(),
            matching_symptoms_count=entry['count'])
        for entry in sorted_diseases
    ]

    return result


@router.post("/disease/from_symptoms", response_model=List[DiseaseMatchOutSchema])
async def get_diseases_from_symptoms(symptoms: List[SymptomResponseSchema]) -> List[DiseaseMatchOutSchema]:
    diseases_matching = []
    disease_matching_count = {}
    for symptom in symptoms:
        # Build the query dynamically based on provided characteristics
        query = Q(symptom__name=symptom.name)
        
        # Add conditions for each characteristic if provided
        if symptom.symmetry_answer:
            query &= Q(characteristic__name="symetria", characteristic__value=symptom.symmetry_answer)
        if symptom.variability_answer:
            query &= Q(characteristic__name="zmienność w czasie", characteristic__value=symptom.variability_answer)
        if symptom.age_onset_answer:
            query &= Q(characteristic__name="wiek podczas wystapienia pierwszych objawów", characteristic__value=symptom.age_onset_answer)
        if symptom.progressive_answer:
            query &= Q(characteristic__name="pogorszenie w ciągu", characteristic__value=symptom.progressive_answer)
        # Add custom logic for value_answer if applicable

        # Perform the query using the built conditions
        matching_maps = await DiseaseSymptomsMap.filter(query).distinct().prefetch_related('disease')

        for match in matching_maps:
            # Update count for each disease found
            if match.disease.name not in disease_matching_count:
                disease_matching_count[match.disease.name] = {'disease': match.disease, 'count': 1}
            else:
                disease_matching_count[match.disease.name]['count'] += 1

        sorted_diseases = sorted(disease_matching_count.values(), key=lambda x: x['count'], reverse=True)

        # Convert sorted diseases to the new output schema, including the count
        result = [
            DiseaseMatchOutSchema(
                **(await DiseaseOutSchema.from_tortoise_orm(entry['disease'])).dict(),
                matching_symptoms_count=entry['count'])
            for entry in sorted_diseases
        ]

        return result