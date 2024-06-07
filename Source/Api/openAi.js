import axios from 'axios';

// Your API key obtained from Anthropic
const anthropicApiKey = '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';

const anthropicClient = axios.create({
    baseURL: 'https://api.anthropic.com',
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
    }
});

// Endpoint for Anthropic's completions
const completionsEndpoint = '/v1/complete';


export const apiCall = async (input) => {
    try {
        console.log('Trying to generate AI response...');
        const response = await anthropicClient.post(completionsEndpoint, {
            prompt:"\n\nHuman: " + input + "\n\nAssistant: ",
            model: 'claude-v1',
            max_tokens_to_sample: 100
        });       
        console.log('Generated AI response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return { success: false, message: error.message };
    }
};
