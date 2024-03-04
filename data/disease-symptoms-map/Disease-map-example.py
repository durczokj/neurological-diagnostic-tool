## mini tutorial how correctly add disease map

# Firstly
# required - IT IS ABSOLUTELY REQUIRED
# excluding - IT IS ABSOLUTELY EXCLUDING
# the rest goes with required = False and excluding = False

# Example for SMBA (Kennedy's)
"""
POST http://localhost:5001/diseasesymptomsmap

{
  "required": true,
  "excluding": false,
  "characteristic_id": 18,
  "disease_id": "SBMA (choroba Kennedy'ego)",
  "symptom_id": "Płeć męska"
}
"""
# Characteristic id 18 is występowanie u pacjenta
#   "characteristic": {
#     "id": 18,
#     "name": "występowanie u pacjenta",
#     "value": "tak",
#     "created_at": "2024-03-03T04:01:03.793010+00:00",
#     "modified_at": "2024-03-03T04:01:03.793016+00:00"
#   }
# }



# Note: For each of the symptoms, you probably need to add a characteristic with 
# występowanie u pacjenta (here id = 18) and value = tak
# As there can be characteristics that user told us he DOES NOT have.
# Lets add "Not having something"

"""
POST http://localhost:5001/diseasesymptomsmap

{
  "required": false,
  "excluding": true,
  "characteristic_id": 19, # ----- HERE IT IS WYSTĘPOWANIE U PACJENTA = NIE
                              {
                                    "id": 19,
                                    "name": "występowanie u pacjenta",
                                    "value": "nie",
                                    "diseasesymptomsmaps": []
                                },
  "disease_id": "SBMA (choroba Kennedy'ego)",
  "symptom_id": "Płeć żeńska"
}
"""




# Now we add the ck_level, which is quite annoying
# Firstly we add all the ck_level brack_levelets that are EXCLUDING (meaning they were not mentioned, lol)
"""
We have
  {
    "id": 20,
    "name": "ck_level_level",
    "value": "norma",
    "diseasesymptomsmaps": []
  },
  {
    "id": 21,
    "name": "ck_level_level",
    "value": "powyżej normy do 1000",
    "diseasesymptomsmaps": []
  },
  {
    "id": 22,
    "name": "ck_level_level",
    "value": "od 1000 do 10000",
    "diseasesymptomsmaps": []
  },
  {
    "id": 23,
    "name": "ck_level_level",
    "value": "powyżej 10000",
    "diseasesymptomsmaps": []
  }
"""
# Patient must have either "powyżej normy do 1000" or "od 1000 do 10000"
# so we first add the other two as excluding
"""
POST http://localhost:5001/diseasesymptomsmap
    
    {
    "required": false,
    "excluding": true,
    "characteristic_id": 20,
    "disease_id": "SBMA (choroba Kennedy'ego)",
    "symptom_id": "ck_level"
    }
    """
# And the second one
"""
POST http://localhost:5001/diseasesymptomsmap
        
        {
        "required": false,
        "excluding": true,
        "characteristic_id": 23,
        "disease_id": "SBMA (choroba Kennedy'ego)",
        "symptom_id": "ck_level"
        }
        """

# We add the first one
"""
POST http://localhost:5001/diseasesymptomsmap
    
    {
    "required": true,
    "excluding": false,
    "characteristic_id": 21,
    "disease_id": "SBMA (choroba Kennedy'ego)",
    "symptom_id": "ck_level"
    }
    """
# And the second one
"""
POST http://localhost:5001/diseasesymptomsmap
    
    {
    "required": true,
    "excluding": false,
    "characteristic_id": 22,
    "disease_id": "SBMA (choroba Kennedy'ego)",
    "symptom_id": "ck_level"
    }
    """
