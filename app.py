from io import BytesIO

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import numpy as np
import base64
from PIL import Image
from pydantic import BaseModel
from tensorflow.keras.models import load_model

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Load model
model = load_model("model.h5")

# Class labels (edit if needed)
class_names = ["Healthy", "Diseased"]

def preprocess_image(image):
    image = image.resize((128, 128)) 
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

class PredictionRequest(BaseModel):
    image: str


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/predict")
async def predict(payload: PredictionRequest):
    data = payload.image

    image_data = base64.b64decode(data.split(',')[1])
    image = Image.open(BytesIO(image_data)).convert("RGB")

    processed = preprocess_image(image)

    prediction = model.predict(processed)

    # Binary classification
    pred = 1 - float(prediction[0][0])

    if pred > 0.5:
        result = "Diseased ❌"
        confidence = pred * 100
    else:
        result = "Healthy ✅"
        confidence = (1 - pred) * 100

    return JSONResponse({
        "result": result,
        "confidence": float(confidence)   # extra safety
    })

if __name__ == '__main__':
    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)

