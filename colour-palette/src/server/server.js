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

app.post('/get_palette', async (req, res) => {
  const userPrompt = req.body.prompt + " Provide a color palette with HEX codes.";

  try {
    // Call the OpenAI API
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": userPrompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    });

    // Extract the response content
    const fullResponse = response.data.choices[0].message.content.trim();
    console.log(`OpenAI API response: ${fullResponse}`);

    // Attempt to find HEX codes in the response
    const hexCodes = fullResponse.match(HEX_COLOR_PATTERN);

    if (hexCodes) {
      // Send all unique HEX codes and the full response
      const uniqueHexCodes = [...new Set(hexCodes)];
      res.json({
        colors: uniqueHexCodes,
        fullResponse: fullResponse
      });
    } else {
      res.json({ error: "No HEX color codes could be identified." });
    }

  } catch (e) {
    console.error(`An error occurred: ${e}`);
    res.status(500).json({ error: e.message });
  }
});

// Run the Express app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});