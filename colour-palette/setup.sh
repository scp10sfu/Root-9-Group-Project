#!/bin/bash

# Navigate to the root directory of your project
cd "$(dirname "$0")"

echo "Installing npm packages..."
# Install npm packages
npm install

echo "Setting up Python virtual environment in the server directory..."
# Set up Python virtual environment
cd src/server
python -m venv venv
source venv/bin/activate

echo "Installing Python packages..."
# Install Python packages
pip install flask flask_cors openai python-dotenv

echo "Setup complete!"
echo "You can now start your React app with 'npm start' from the project root and your Flask server with 'flask run' inside the server directory."
