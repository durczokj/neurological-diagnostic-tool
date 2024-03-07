from async_base_insert import BaseInsert
import asyncio
import json


class MappedInsert(BaseInsert):

    def __init__(self, username, password, directory, filename):
        super().__init__(username, password, directory)

        self.filename = filename

    def run(self):
        asyncio.run(self.main())    

    async def main(self):
        data = self.get_dsmap_file()
        async with self.session:
            await self.login_or_register()
            characteristics = await self.get_characteristics()
            data_processed = self.get_id_by_name_value(characteristics, data)
            for record in data_processed:
                # print(record)
                #await self.session.post(f'http://backend:5001/{self.endpoint}', record)
                await self.insert(self.endpoint, record)

    async def get_characteristics(self):
        characteristics = await self.session.get('http://backend:5001/characteristic')
        return characteristics.json()
    
    def get_dsmap_file(self):
        with open(self.directory+self.filename, 'r', encoding="utf-8") as file:
            self.endpoint = self.filename.replace(".json", "")
            data = json.load(file)[self.endpoint]
            return data

    def get_id_by_name_value(self, characteristics, data):
        # Create a dictionary of characteristics with name and value as the key
        characteristics_dict = {(char['name'], char['value']): char['id'] for char in characteristics}

        # Update the characteristic_id field in diseases based on the matching name and value
        for mapping in data:
            if mapping['characteristic_id'] != None:
                char_name = mapping['characteristic_id']['name']
                char_value = mapping['characteristic_id']['value']
                mapping['characteristic_id'] = characteristics_dict.get((char_name, char_value), None)
        return data
        



    






