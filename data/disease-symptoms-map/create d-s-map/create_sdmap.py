import json

is_initial_symptom = False
#my_symptoms = ["Proksymalny niedowład kończyn górnych", "Proksymalny niedowład kończyn dolnych",
#               "Dystalny niedowład kończyn górnych", "Dystalny niedowład kończyn dolnych" ]
             
#              'Ptoza', "Dwojenie obrazu", "Oftalmopegia","Dysfagia", "Zaburzenia gryzienia/żucia pokarmów", "Duszność",
#                "Zaburzenia mowy", "Proksymalny niedowład kończyn górnych", "Proksymalny niedowład kończyn dolnych",
#               "Dystalny niedowład kończyn górnych", "Dystalny niedowład kończyn dolnych" ]
#my_symptoms = ["RZS - choroba współistniejąca","Hashimoto lub niedoczynność tarczycy - choroba współistniejąca","Choroba Graves-Basedowa - choroba współistniejąca","Cukrzyca t1 - choroba współistniejąca"
#               "Pogorszenie po wysiłku", "Poprawa po odpoczynku","Pogorszenie w czasie infekcji"]

#my_symptoms = ["Nowotwór drobnokomórkowy płuca - choroba współistniejąca","Objawy kończynowe są znacznie bardziej nasilone niż oczne i opuszkowe", "Niedowład proksymalny bardziej nasilony niż dystalny",
#                "Poziom CK większy niż 1000","Pogorszenie w czasie infekcji", "Suchość w jamie ustnej", "Suchość spojówek",
#                "Omdlenia ortostatyczne", "Impotencja", "Zaparcia", "Arefleksja"]





my_symptoms = ["Poziom CK większy niż 1000", "Gammapatia monoklonalna - choroba współistniejąca", "Cukrzyca t1 - choroba współistniejąca",  "HIV - choroba współistniejąca"]



my_dict = {
        "required": "false",
        "excluding": "false",
        "characteristic_id": "",
        "disease_id": "CIDP",
        "symptom_id": "Ptoza"
        }

for symptom in my_symptoms:
    my_dict['symptom_id'] = symptom
    if is_initial_symptom:
        with open('characteristic-use.json', 'r', encoding="utf-8") as file:
            data = json.load(file)['characteristic']
            for record in data:
                my_dict['characteristic_id'] = record
                print(json.dumps(my_dict, indent=4, ensure_ascii=False), ",")
    else:
        print(json.dumps(my_dict, indent=4, ensure_ascii=False), ",")

