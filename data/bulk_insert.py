from async_base_insert import BaseInsert
from mapped_insert import MappedInsert
import asyncio

base_insert = BaseInsert("marta", "pass")
base_insert.run()

mapped_insert = MappedInsert('marta', 'pass', 'disease-symptoms-map/', 'diseasesymptomsmap.json')
mapped_insert.run()