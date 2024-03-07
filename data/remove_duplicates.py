# Adjusting the script to take input and output paths, with UTF-8 encoding for reading and writing.

def process_symptoms_file(input_path, output_path):
    """
    Reads a JSON file containing symptoms, removes duplicates based on the 'name' attribute,
    and writes the processed data back to another file.
    
    Parameters:
    - input_path: Path to the input JSON file.
    - output_path: Path where the output JSON file will be saved.
    """
    import json

    # Read the input JSON file
    with open(input_path, 'r', encoding='utf-8') as file:
        json_data = json.load(file)

    unique_symptoms = []
    no_duplicates = []

    # Process to remove duplicates
    for symptom in json_data["symptoms"]:
        if symptom["name"] not in unique_symptoms:
            print("Adding symptom:", symptom["name"])
            unique_symptoms.append(symptom["name"])
            no_duplicates.append(symptom)

    json_data["symptoms"] = no_duplicates

    # Write the processed JSON data to the output file
    with open(output_path, 'w', encoding='utf-8') as file:
        json.dump(json_data, file, ensure_ascii=False, indent=4)

# Example usage (you'll need to replace 'input.json' and 'output.json' with your actual file paths)
input_path = 'symptoms.json'  # This path is an example; you need to replace it with your actual input file path.
output_path = 'symptoms.json'  # This path is an example; you need to replace it with your actual output file path.

# Note: The actual file reading and writing cannot be performed in this environment due to its limitations.
# You should run this script in your local environment, ensuring you have the correct file paths.

if __name__ == "__main__":
    process_symptoms_file(input_path, output_path)