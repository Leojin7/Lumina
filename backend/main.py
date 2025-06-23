from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx

app = FastAPI()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],  # Add your frontend dev URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageRequest(BaseModel):
    image_base64: str

GOOGLE_VISION_API_KEY = "AIzaSyBO1laqbezu0LMjKnL0uidKpCQM0moaU0w"
GOOGLE_VISION_API_URL = f"https://vision.googleapis.com/v1/images:annotate?key={GOOGLE_VISION_API_KEY}"

@app.post("/analyze-image")
async def analyze_image(request: ImageRequest):
    payload = {
        "requests": [
            {
                "image": {"content": request.image_base64},
                "features": [
                    {"type": "LABEL_DETECTION", "maxResults": 10},
                    {"type": "IMAGE_PROPERTIES"},
                    {"type": "SAFE_SEARCH_DETECTION"}
                ]
            }
        ]
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(GOOGLE_VISION_API_URL, json=payload)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to analyze image")
    return response.json()
