const axios = require('axios');

const testOpenAiApi = async () => {
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: "Translate the following English text to French: 'Hello, how are you?'",
            max_tokens: 60
        }, {
            headers: {
                'Authorization': `Bearer YOUR_API_KEY`
            }
        });

        console.log("Response from OpenAI:", response.data.choices[0].text.trim());
    } catch (error) {
        console.error("Error testing OpenAI API:", error.message);
    }
};

testOpenAiApi();


