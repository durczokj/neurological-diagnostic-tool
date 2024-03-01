from tortoise import fields, Model


class Users(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=20, unique=True)
    full_name = fields.CharField(max_length=50, null=True)
    password = fields.CharField(max_length=128, null=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)


class Symptoms(Model):
    name = fields.CharField(pk=True, max_length=225)
    display_name = fields.CharField(max_length=512)
    description = fields.TextField()
    media = fields.TextField()
    group = fields.CharField(max_length=225)

    # Boolean fields to indicate whether the symptom can have these characteristics
    can_be_symmetric = fields.BooleanField(default=False)
    can_have_severity_over_time = fields.BooleanField(default=False)
    can_have_age_of_symptom_onset = fields.BooleanField(default=False)
    can_worsen_over_time = fields.BooleanField(default=False)
    
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)



class DiseaseSymptoms_Map(Model):
    id = fields.IntField(pk=True)
    symptom_name = fields.ForeignKeyField('models.Symptoms', related_name='name')
    #disease_name = fields.ForeignKeyField('models.Diseases', related_name='name')
    symptom_name = fields.CharField(max_length=512)
    disease_name = fields.CharField(max_length=512)
    required = fields.BooleanField(default=False)
    excluding = fields.BooleanField(default=False)
    #characteristic = fields.ForeignKeyField('models.Characteristics', related_name='id')
    characteristic = fields.CharField(max_length=512)

class Disease(Model):
    name = fields.CharField(max_length=225, pk=True)
    group = fields.CharField(max_length=225)
    subgroup = fields.CharField(max_length=225)
    description = fields.CharField(max_length=225)

    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)

class Characteristic(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=225)
    value = fields.CharField(max_length=225)


    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)


