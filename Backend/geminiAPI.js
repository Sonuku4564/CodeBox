import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = "AIzaSyBwNRp8oG20SPec4lwtlmulZSVRsFP3FhQ";

export async function getCodeSuggestion(prompt) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [
                 {
                   parts: [
                     {
                        text: prompt 
                     }
                    ]
                  }
                ]
           }
       );

     //  console.log(response.data)
       const textPart = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
       return textPart || "No suggestion available.";

   } catch (error) {
       console.error("Gemini AI Error:", error.response ? error.response.data : error.message);
       return "Error generating code suggestion.";
   }
}