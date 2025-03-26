import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const getRecommendations = async (req, res) => {
  try {
    const { bmi } = req.body;
    if (!bmi) {
      return res.status(400).json({ message: "BMI is required" });
    }

    // Strict prompt for valid JSON output
    const prompt = `Based on a BMI of ${bmi}, generate a structured daily recommendation.
Return a JSON with exactly two keys: "meals" and "workouts".
"meals" should contain recommendations for "morning", "afternoon", "evening", and "dinner".
"workouts" should contain a day-wise schedule for the week (Monday to Sunday) with a short description for each day.
Output only valid JSON, without any extra text or log information.
The output must start with '{' and end with '}'.`;

    console.log("Sending prompt to Hugging Face:", prompt);

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-125M",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const generatedText = response.data[0]?.generated_text.trim();
    console.log("Raw AI Output:", generatedText);

    // Use regex to extract only the JSON part
    const jsonMatch = generatedText.match(/\{[\s\S]*\}$/);
    if (!jsonMatch) {
      return res.status(500).json({ message: "Failed to extract JSON" });
    }

    const cleanedJson = jsonMatch[0];
    let recommendations;
    try {
      recommendations = JSON.parse(cleanedJson);
    } catch (parseError) {
      return res.status(500).json({ 
        message: "Failed to parse recommendations", 
        error: parseError.message 
      });
    }

    return res.status(200).json({ recommendations });
  } catch (error) {
    console.error("Error in getRecommendations:", error.response?.data || error.message);
    return res.status(500).json({ message: "Failed to generate recommendations" });
  }
};

export default getRecommendations;
