import httpx
import json
import asyncio
import os
import time

async def login_or_register(session, username, password):
    register_data = {
        'username': username,
        'full_name': username,
        'password': password
    }

    try:
        response = await session.post('http://localhost:5001/register', json=register_data)
    # handle 401 as user already exists
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 401:
            print(f"Not registering - User {username} already exists")
        else:
            raise Exception('Not able to register a user') from e

    login_data = {
        'username': username,
        'password': password,
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
        response = await session.post('http://localhost:5001/login', data=login_data, headers=headers)
        print(response.content)
    except Exception as e:
        raise e #Exception('Login failed') from e

async def async_function(session, endpoint, data):
    response = await session.post(f'http://localhost:5001/{endpoint}', content=data)
    if response.status_code == 200:
        print(f"Request succeeded for table {endpoint}")
    else:
        print(response)
        # await asyncio.sleep(2)  # Use asyncio.sleep for async code
        print(f"Request failed for table {endpoint}")

async def push_data_to_db(directory, session):
    current_file = os.path.abspath(__file__)
    current_directory = os.path.dirname(current_file)
    for filename in os.listdir(current_directory):
        if filename.endswith('.json'):
            endpoint = filename.replace('.json', '')
            with open(filename, 'r', encoding="utf-8") as file:
                data = json.load(file)[endpoint]
                for record in data:
                    record = json.dumps(record)
                    await async_function(session, endpoint, record)

async def health_check_loop(session, directory):
    while True:
        try:
            response = await session.get('http://localhost:5001/')
            print(response)
            print("Health check status is ok.")
            break
        except Exception as e:
            print("Health check status is not ok.")
            # await asyncio.sleep(1)  # Use asyncio.sleep for async code

async def main():
    async with httpx.AsyncClient() as session:
        directory = ''
        await health_check_loop(session, directory)
        await login_or_register(session, 'marta', 'pass')
        await push_data_to_db(directory, session)

if __name__ == '__main__':
    asyncio.run(main())
