import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

if (!apiKey || !unsplashAccessKey) {
  console.error("API keys not set in .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

function enhancePrompt(originalPrompt) {
  return `${originalPrompt}

IMPORTANT:
- Return the response strictly in JSON format.
- Use proper JSON structure: keys must be in double quotes.
- Each hotel or place must have a valid image URL from trusted sources (not example.com).
- If unsure of image, leave image URL empty.`;
}

export async function generateTravelPlanJson(promptText) {
  const fullPrompt = enhancePrompt(promptText);

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig,
      safetySettings,
    });

    const text = result.response.text().trim();
    // console.log("Raw Gemini Response:", text);

    // Try extracting JSON content from mixed text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch?.[0] || text);

    const plan = await addRealImages(parsed);
    return plan;
  } catch (error) {
    console.error("Error generating travel plan:", error);
    return undefined;
  }
}

async function fetchUnsplashImage(query) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${unsplashAccessKey}&per_page=1`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
  } catch (error) {
    console.error("Unsplash image fetch error:", error);
  }
  return "https://via.placeholder.com/400x300?text=Image+Not+Found";
}

async function addRealImages(plan) {
  const travelPlanData = plan.TravelPlan || plan.travelPlan || plan;

  const hotels = travelPlanData.Hotels || travelPlanData.hotels;
  const itinerary = travelPlanData.Itinerary || travelPlanData.itinerary;

  if (!hotels || !itinerary) {
    throw new Error("Invalid travel plan structure. Missing 'Hotels' or 'Itinerary'.");
  }

  for (const hotel of hotels) {
    const image = hotel.HotelImageUrl || "";
    const isInvalid = !image || image.includes("example.com") || image.includes("/p/");
    if (isInvalid) {
      const query = hotel.HotelName || hotel.Description || "Hotel";
      hotel.HotelImageUrl = await fetchUnsplashImage(query);
    }
  }

  for (const day of itinerary) {
    const planList = day.Plan || day.plan || [];
    for (const place of planList) {
      const image = place.PlaceImageUrl || "";
      const isInvalid = !image || image.includes("example.com") || image.includes("/p/");
      if (isInvalid) {
        const query = place.PlaceName || place.PlaceDetails || "Place";
        place.PlaceImageUrl = await fetchUnsplashImage(query);
      }
    }
  }

  return JSON.stringify({ TravelPlan: travelPlanData }, null, 2);
}
