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

# Initialize OpenAI with the API key from the .env file
openai.api_key = os.getenv("OPENAI_API_KEY")

# Define a regular expression pattern to match HEX color codes
HEX_COLOR_PATTERN = r'(#[0-9A-Fa-f]{6}\b)'

@app.route('/get_palette', methods=['POST'])
def get_palette():
    user_prompt = request.json.get('prompt') + " Provide a color palette with HEX codes."

    try:
        # Call the OpenAI API
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_prompt}
            ]
        )

        # Extract the response content
        content = response.choices[0].message.content.strip()

        # Attempt to find HEX codes in the response
        hex_codes = re.findall(HEX_COLOR_PATTERN, content, re.IGNORECASE)

        if hex_codes:
            return jsonify({"colors": hex_codes})
        else:
            return jsonify({"error": "No HEX color codes could be identified."}), 200

    except Exception as e:
        # Log the exception
        app.logger.error(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
