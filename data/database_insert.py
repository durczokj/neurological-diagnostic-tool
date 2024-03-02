import requests
import json
import asyncio
import os



def login_or_register(session, username, password):

    register_data = {
        'username': username,
        'full_name': username,
        'password': password
    }
    register_data = json.dumps(register_data)

    try:
        response = session.post('http://localhost:5001/register', register_data)
    except:
        raise Exception(response.json())

    login_data = {
        'username': username,
        'password': password
    }
    try:
        response = session.post('http://localhost:5001/login', login_data)
    except:
        raise Exception(response.json())



async def async_function(session, endpoint, data):

    response = await asyncio.get_running_loop().run_in_executor(None, session.post, f'http://localhost:5001/{endpoint}', data)

    if response.status_code == 200:
        print(f"Request succeded for table {endpoint}")

    else:
        print(response)
        await asyncio.sleep(2)
        print(f"Request failed for table {endpoint}")


async def push_data_to_db(directory, session):
    
    for filename in os.listdir(os.getcwd()):
        if filename.endswith('.json'):
            endpoint = filename.replace('.json', '')
            with open(filename, 'r') as file:
                data = json.load(file)[endpoint]
                for record in data:
                   record = json.dumps(record)
                   await async_function(session, endpoint, record)


async def health_check_loop(session, directory):
    while True:
        # Perform the health check
        response = await asyncio.get_running_loop().run_in_executor(None, session.get, 'http://localhost:5001/')

        # Check the health check status
        if response.status_code == 200:
            print("Health check status is ok.")
            break
        else:
            print("Health check status is not ok.")
            await asyncio.sleep(1)

    await push_data_to_db(directory, session)

async def main():
    session = requests.Session()
    directory = ''
    login_or_register(session, 'marta', 'pass')
    await health_check_loop(session, directory)

    await session.close()


if __name__ == '__main__':
    asyncio.run(main())









