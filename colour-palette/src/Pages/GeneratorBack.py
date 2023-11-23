from flask import Flask, request, jsonify, render_template_string
import re
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Initialize OpenAI with the API key from the .env file
openai.api_key = os.getenv("OPENAI_API_KEY")

# Define a regular expression pattern to match HEX color codes
HEX_COLOR_PATTERN = r'(#[0-9A-Fa-f]{6}\b)'

# HTML template using Python multi-line string for rendering the color palette
HTML_TEMPLATE = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Color Palette Generator</title>
    <link rel="stylesheet" type="text/css" href="/static/palette_generator.css">
</head>
<body>
    <h2>Ask for a Color Palette</h2>
    <form id="paletteForm">
        <label for="prompt">Describe the picture you want to draw:</label><br>
        <input type="text" id="prompt" name="prompt" required><br>
        <input type="submit" value="Get Palette">
    </form>
    <div id="palette">
        <p>Color Palette:</p>
        <div class="color-swatches" id="colorSwatches"></div>
    </div>
    <script src="/static/palette_generator.js"></script>
</body>
</html>
'''

@app.route('/', methods=['GET'])
def index():
    # Render the HTML form
    return render_template_string(HTML_TEMPLATE)

@app.route('/get_palette', methods=['POST'])
def get_palette():
    user_prompt = request.form['prompt'] + " Provide a color palette with HEX codes."
    try:
        # Call the OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_prompt}
            ]
        )
        
        # Extract the response content
        content = response['choices'][0]['message']['content'].strip()
        # Attempt to find HEX codes in the response
        hex_codes = re.findall(HEX_COLOR_PATTERN, content, re.IGNORECASE)
        
        # Check if we found any HEX codes, else return an error message
        colors = hex_codes if hex_codes else ["No HEX color codes could be identified."]
    except Exception as e:
        colors = [f"Error retrieving palette: {e}"]

    return jsonify({"colors": colors})

if __name__ == '__main__':
    app.run(debug=True)
