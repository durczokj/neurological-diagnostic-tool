import httpx
import json
import asyncio
import os
import time

class BaseInsert():

    def __init__(self, username: str, password: str, directory:str = None):
        self.username = username
        self.password = password

        if directory:
            self.directory = directory
        else:
            current_file = os.path.abspath(__file__)
            current_directory = os.path.dirname(current_file)
            self.directory = current_directory + "/"

        self.session = httpx.AsyncClient()

    def run(self):
        asyncio.run(self.main())

    async def login_or_register(self):

        register_data = {
            'username': self.username,
            'full_name': self.username,
            'password': self.password
        }

        try:
            response = await self.session.post('http://localhost:5001/register', json=register_data)
        # handle 401 as user already exists
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 401:
                print(f"Not registering - User {self.username} already exists")
            else:
                raise Exception('Not able to register a user') from e

        login_data = {
            'username': self.username,
            'password': self.password,
            'grant_type': '',
            'scope': '',
            'client_id': '',
            'client_secret': ''
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
        try:
            response = await self.session.post('http://localhost:5001/login', data=login_data, headers=headers)
            print(response.content)
        except Exception as e:
            raise e #Exception('Login failed') from e

    async def insert(self, endpoint, data):
        response = await self.session.post(f'http://localhost:5001/{endpoint}', json=data)
        if response.status_code == 200:
            pass
            # print(f"Request succeeded for table {endpoint}")
        else:
            print(response)
            await asyncio.sleep(2)  # Use asyncio.sleep for async code
            print(f"Request failed for table {endpoint} with data {data}"\
                  f"-------- {response.content}")

    async def push_data_to_db(self):

        for filename in os.listdir(self.directory):
            if filename.endswith('.json'):
                endpoint = filename.replace('.json', '')
                with open(self.directory+filename, 'r', encoding="utf-8") as file:
                    data = json.load(file)[endpoint]
                    for record in data:
                        await self.insert(endpoint, record)

    async def health_check_loop(self):
        while True:
            try:
                response = await self.session.get('http://localhost:5001/')
                print(response)
                print("Health check status is ok.")
                break
            except Exception as e:
                print("Health check status is not ok.")
                await asyncio.sleep(1)  # Use asyncio.sleep for async code

    async def main(self):
        async with self.session:
            await self.health_check_loop()
            await self.login_or_register()
            await self.push_data_to_db()


'''
insert = BaseInsert("marta", "pass")
insert.run()
'''
