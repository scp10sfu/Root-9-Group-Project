

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import os
# import openai
# import re

# # Load environment variables
# from dotenv import load_dotenv
# load_dotenv()

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes
# app.debug = True  # Ensure debug mode is on

# # Initialize OpenAI with the API key from the .env file
# openai.api_key = os.getenv("OPENAI_API_KEY")

# # Define a regular expression pattern to match HEX color codes
# HEX_COLOR_PATTERN = r'(#[0-9A-Fa-f]{6}\b)'

# @app.route('/get_palette', methods=['POST'])
# def get_palette():
#     user_prompt = request.json['prompt'] + " Provide a color palette with HEX codes."

#     # Log the received prompt
#     print(f"Received prompt: {user_prompt}")

#     try:
#         # Call the OpenAI API
#         response = openai.chat.completions.create(
#             model="gpt-3.5-turbo",
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant."},
#                 {"role": "user", "content": user_prompt}
#             ]
#         )
    
#         # Log the entire response content
#         print(f"OpenAI API response: {response.choices[0].message.content}")

#         # Extract the response content
#         content = response.choices[0].message.content.strip()

#         # Attempt to find HEX codes in the response
#         hex_codes = re.findall(HEX_COLOR_PATTERN, content, re.IGNORECASE)

#         # Log the found HEX codes
#         print(f"Extracted HEX codes: {hex_codes}")

#         if hex_codes:
#             # Send all unique HEX codes
#             unique_hex_codes = list(set(hex_codes))
#             return jsonify({"colors": unique_hex_codes})
#         else:
#             return jsonify({"error": "No HEX color codes could be identified."}), 200

#     except Exception as e:
#         # Log the exception
#         print(f"An error occurred: {e}")
#         return jsonify({"error": str(e)}), 500

# # Run the Flask app
# if __name__ == '__main__':
#     app.run()
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai
import re

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.debug = True  # Ensure debug mode is on

# Initialize OpenAI with the API key from the .env file
openai.api_key = os.getenv("OPENAI_API_KEY")

# Define a regular expression pattern to match HEX color codes
HEX_COLOR_PATTERN = r'(#[0-9A-Fa-f]{6}\b)'

# @app.route('/get_palette', methods=['POST'])
# def get_palette():
#     user_prompt = request.json['prompt'] + " Provide a color palette with HEX codes."
    
#     # Log the received prompt
#     print(f"Received prompt: {user_prompt}")

#     try:
#         # Call the OpenAI API
#         response = openai.chat.completions.create(
#             model="gpt-3.5-turbo",
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant."},
#                 {"role": "user", "content": user_prompt}
#             ]
#         )

#         # Extract the response content
#         content = response.choices[0].message.content.strip()

#         # Log the entire response content
#         print(f"OpenAI API response: {response.choices[0].message.content}")

#         # Attempt to find HEX codes in the response
#         hex_codes = re.findall(HEX_COLOR_PATTERN, content, re.IGNORECASE)

#         # Log the found HEX codes
#         print(f"Extracted HEX codes: {hex_codes}")

#         if hex_codes:
#             # Send all unique HEX codes along with a custom message
#             unique_hex_codes = list(set(hex_codes))
#             return jsonify({
#                 "colors": unique_hex_codes, 
#                 "message": "Your customized color palette:"
#             })
#         else:
#             return jsonify({"error": "No HEX color codes could be identified."}), 200

#     except Exception as e:
#         # Log the exception
#         app.logger.error(f"An error occurred: {e}")
#         return jsonify({"error": str(e)}), 500
@app.route('/get_palette', methods=['POST'])
def get_palette():
    user_prompt = request.json['prompt'] + " Provide a color palette with HEX codes."

    try:
        # Call the OpenAI API
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_prompt}
            ]
        )

        # Extract the response content
        full_response = response.choices[0].message.content.strip()
        print(f"OpenAI API response: {full_response}")

        # Attempt to find HEX codes in the response
        hex_codes = re.findall(HEX_COLOR_PATTERN, full_response, re.IGNORECASE)

        if hex_codes:
            # Send all unique HEX codes and the full response
            unique_hex_codes = list(set(hex_codes))
            return jsonify({
                "colors": unique_hex_codes, 
                "fullResponse": full_response  # Include the full response text
            })
        else:
            return jsonify({"error": "No HEX color codes could be identified."}), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run()
