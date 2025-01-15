import { HfInference } from "@huggingface/inference";


export const generateResponse = async (messages) => {
    const hf_token = process.env.HUGGINGFACE_API_TOKEN; // Get token from environment
    const inference = new HfInference(hf_token);
    try {
        const response = await inference.chatCompletion({
            model: "meta-llama/Llama-3.2-11B-Vision-Instruct",
            messages: messages,
            temperature: 0.5,
            max_tokens: 2048,
            top_p: 0.7        
        });
        console.log("Response:", response);
        
        return response.choices[0].message;
    } catch (error) {
        throw new Error('Hugging Face API Error ' + error);
    }
}

