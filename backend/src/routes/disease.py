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
    disease_sets = []
    
    for symptom in symptoms:
        # Initialize a list to hold the set of diseases for each characteristic
        disease_sets_for_symptom = []

        # Build and execute queries for each characteristic if provided
        characteristics = [
            ("symetria", symptom.symmetry_answer),
            ("zmienność w czasie", symptom.variability_answer),
            ("wiek podczas wystapienia pierwszych objawów", symptom.age_onset_answer),
            ("pogorszenie w ciągu", symptom.progressive_answer),
        ]
        if not any(char_value for _, char_value in characteristics):
            query = Q(symptom__name=symptom.name)
            matching_maps = await DiseaseSymptomsMap.filter(query).distinct().prefetch_related('disease')
            diseases_for_characteristic = {match.disease.name for match in matching_maps}
            print(f"Symptom: {symptom.name}, Diseases: {diseases_for_characteristic}")
            disease_sets_for_symptom.append(diseases_for_characteristic)

        for char_name, char_value in characteristics:
            if char_value:
                query = Q(symptom__name=symptom.name, characteristic__name=char_name, characteristic__value=char_value, excluding=False)
                matching_maps = await DiseaseSymptomsMap.filter(query).distinct().prefetch_related('disease')
                diseases_for_characteristic = {match.disease.name for match in matching_maps}
                print(f"Symptom: {symptom.name}, Characteristic: {char_name}, Value: {char_value}, Diseases: {diseases_for_characteristic}")
                disease_sets_for_symptom.append(diseases_for_characteristic)

        # Find the intersection of diseases for all characteristics of this symptom
        if disease_sets_for_symptom:
            common_diseases = set.intersection(*disease_sets_for_symptom)
            disease_sets.append(common_diseases)

    # Find the intersection of diseases across all symptoms
    if disease_sets:
        common_diseases_across_symptoms = set.intersection(*disease_sets)
    else:
        common_diseases_across_symptoms = set()

    disease_counts = {disease: 0 for disease in common_diseases_across_symptoms}
    for disease_set in disease_sets:
        for disease in disease_set:
            disease_counts[disease] += 1
    # Fetch Disease objects for the final list of disease names
    final_diseases = await Disease.filter(name__in=common_diseases_across_symptoms).all()
        # Sort diseases by the count of matched symptoms in descending order
    sorted_disease_names = sorted(disease_counts, key=disease_counts.get, reverse=True)

    # Prepare the response
    response = []
    for disease_name in sorted_disease_names:
        # Find the disease object from the list of final diseases
        disease_obj = next((d for d in final_diseases if d.name == disease_name), None)
        if disease_obj:
            # Assuming DiseaseOutSchema can create an instance from a Disease model
            disease_data = await DiseaseOutSchema.from_tortoise_orm(disease_obj)

            # Append to the response list with the count of matched symptoms
            response.append(DiseaseMatchOutSchema(
                **disease_data.dict(),  # Convert the DiseaseOutSchema instance to a dict
                matching_symptoms_count=disease_counts[disease_name]  # Add the count of matched symptoms
            ))

    return response