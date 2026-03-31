from flask import Flask, render_template, request, jsonify
import numpy as np
import base64
from PIL import Image
from io import BytesIO
from tensorflow.keras.models import load_model

app = Flask(__name__, static_folder='static')

# Load model
model = load_model("model.h5")

# Class labels (edit if needed)
class_names = ["Healthy", "Diseased"]

def preprocess_image(image):
    image = image.resize((128, 128)) 
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['image']

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

    return jsonify({
        "result": result,
        "confidence": float(confidence)   # extra safety
    })

if __name__ == '__main__':
    app.run(debug=True)

