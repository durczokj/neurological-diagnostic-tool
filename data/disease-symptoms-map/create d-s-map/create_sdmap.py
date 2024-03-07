import json

is_initial_symptom = False
#my_symptoms = ["Dystalny niedowład kończyn górnych", "Dystalny niedowład kończyn dolnych" , 
#                "Proksymalny niedowład kończyn górnych", "Proksymalny niedowład kończyn dolnych",
#                "Niedomykanie powiek", "Uśmiech poprzeczny", "Brak możliwości gwizdania/nadęcia policzków"]

#my_symptoms = ["CK"]
#my_symptoms = ["Ptoza",  "Proksymalny niedowład kończyn górnych", "Proksymalny niedowład kończyn dolnych",
#                "Niedowład mięśni osiowych"]

#my_symptoms = ["Łysienie czołowe", "Zaćma", "Insulinoodporność", "OBS (obturacyjny bezdech senny)",  "Ból mięśni" ,
#             "Hipotonia", "Zaburzenia rytmu serca"]
#my_symptoms = ['Ptoza', "Dysfagia", "Zaburzenia gryzienia/żucia pokarmów",
#                "Zaburzenia mowy", "Proksymalny niedowład kończyn górnych", "Proksymalny niedowład kończyn dolnych",
#              "Dystalny niedowład kończyn górnych", "Dystalny niedowład kończyn dolnych" 
#              ]
#my_symptoms = ["RZS - choroba współistniejąca","Hashimoto lub niedoczynność tarczycy - choroba współistniejąca","Choroba Graves-Basedowa - choroba współistniejąca","Cukrzyca t1 - choroba współistniejąca"
#               "Pogorszenie po wysiłku", "Poprawa po odpoczynku","Pogorszenie w czasie infekcji"]

#my_symptoms = ["Niedowład dystalny bardziej nasilony niż proksymalny", "Niedowład kończyn górnych większy niż kończyn dolnych",
#                "Poziom CK większy niż 1000","Pogorszenie w czasie infekcji", "Zanik mięśni", "Zaburzenia czucia"]
               # "Suchość w jamie ustnej", "Suchość spojówek","Omdlenia ortostatyczne", "Impotencja", "Zaparcia", "Arefleksja"]

#my_symptoms = ["Niedosłuch", "Zaburzenia rytmu serca", "Zaburzenia funkcji poznawczych", "Padaczka",
#                "Dominujące zajęcie mięśni twarzy", "Zanik mięśni ramion", "Hiperlordoza lędźwiowa",
#                "Wystający brzuch", "Ból mięśni", "Spanie z otwartymi oczami" ]

my_symptoms = ["Ból mięśni", "Niepłodność - oligospermia", "Zanik jąder", "Drżenie", ]

#my_symptoms = ["Hiperlordoza lędźwiowa", "Powiększony język", "Hipotonia", "Przewlekła niewydolność oddechowa", "Zaparcia"
#                "Przodopochylenie miednicy", "Przerost łydek", "Skolioza", "Ból mięśni", "Kifoza", "Kardiomiopatia",
#                "Powoli postępujące zajęcie obręczy biodrowej i barkowej"]

#my_symptoms = ["Zaburzenia czucia", "Dominujące zajęcie mięśni obręczy barkowej (ramion) i biodrowej (ud)" ]

#my_symptoms = ["Poziom CK w normie", "Płeć żeńska", "Kardiomiopatia", "Opóźnienie rozwoju intelektualnego"
#               "Wstawanie z podłogi wspinając sę po sobie - objaw Gowers'a", "Hiperlordoza lędźwiowa", "Hipotonia",
 #               ]

my_dict = {
        "required": "false",
        "excluding": "false",
        "characteristic_id": None,
        "disease_id": "SBMA (choroba Kennedy'ego)",
        "symptom_id": "zespół miasteniczny Lamberta-Eatona"
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

