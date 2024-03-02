import requests
import json
import asyncio
import os
import time



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
        raise Exception('Not able to register a user')

    login_data = {
        'username': username,
        'password': password
    }
    try:
        response = session.post('http://localhost:5001/login', login_data)
    except:
        raise Exception(response)



async def async_function(session, endpoint, data):

    response = session.post(f'http://localhost:5001/{endpoint}', data)

    if response.status_code == 200:
        print(f"Request succeded for table {endpoint}")

    else:
        print(response)
        time.sleep(2)
        print(f"Request failed for table {endpoint}")


async def push_data_to_db(directory, session):
    
    current_file = os.path.abspath(__file__)
    current_directory = os.path.dirname(current_file)
    for filename in os.listdir(current_directory):
        if filename.endswith('.json'):
            endpoint = filename.replace('.json', '')
            with open(filename, 'r') as file:
                data = json.load(file)[endpoint]
                for record in data:
                   record = json.dumps(record)
                   await async_function(session, endpoint, record)


def health_check_loop(session, directory):
    while True:
        # Perform the health check
        try:
            response = session.get('http://localhost:5001/')
            print(response)
            print("Health check status is ok.")
            break
        except:
            print("Health check status is not ok.")
            time.sleep(1)

    

async def main():
    session = requests.Session()
    directory = ''
    health_check_loop(session, directory)
    login_or_register(session, 'marta', 'pass')
    await push_data_to_db(directory, session)
    

if __name__ == '__main__':
    asyncio.run(main())









