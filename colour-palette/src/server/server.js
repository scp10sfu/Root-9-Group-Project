const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());  // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const HEX_COLOR_PATTERN = /#[0-9A-Fa-f]{6}\b/g;  // Regular expression for HEX color codes

// Store the conversation history (in a real application, this should be stored in a database)
let conversationHistory = [];

app.post('/get_palette', async (req, res) => {
  const userPrompt = req.body.prompt + " Provide a color palette with HEX codes.";
  // Append the user's prompt to the conversation history
  conversationHistory.push({ role: "user", content: userPrompt });

  try {
    // Call the OpenAI API with the conversation history
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: conversationHistory
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    });

    // Extract the response content and add it to the conversation history
    const aiResponse = response.data.choices[0].message.content.trim();
    conversationHistory.push({ role: "assistant", content: aiResponse });

    // Attempt to find HEX codes in the AI's response
    const hexCodes = aiResponse.match(HEX_COLOR_PATTERN);

    // Respond with the conversation history and any HEX codes found
    res.json({
      conversation: conversationHistory,
      colors: hexCodes ? [...new Set(hexCodes)] : []
    });

  } catch (e) {
    console.error(`An error occurred: ${e}`);
    // Include the error in the conversation history
    conversationHistory.push({ role: "system", content: `An error occurred: ${e.message}` });
    res.status(500).json({
      conversation: conversationHistory,
      error: e.message
    });
  }
});

// Run the Express app
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app for Vercel
module.exports = app;