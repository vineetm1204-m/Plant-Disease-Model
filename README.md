<div align="center">

# 🌿 Leaf Health Scanner
### Plant Disease Detection Using Machine Learning

![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=for-the-badge&logo=flask&logoColor=white)
![Keras](https://img.shields.io/badge/Keras-TensorFlow-D00000?style=for-the-badge&logo=keras&logoColor=white)
![HTML5](https://img.shields.io/badge/Frontend-HTML%2FJS-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![Heroku](https://img.shields.io/badge/Deployed-Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

<br/>

> **Point your camera at a leaf → Get an instant diagnosis.**
> A deep learning PWA that detects plant disease in real time using your device camera — no file uploads, no friction.

</div>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Dataset](#-dataset)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Model Details](#-model-details)
- [Deployment](#-deployment)
- [Author](#-author)

---

## 🌱 About the Project

Plant diseases cause massive agricultural losses every year, often going undetected until it's too late. The **Leaf Health Scanner** is a deep learning-based **Progressive Web App (PWA)** that detects whether a plant leaf is **healthy or diseased** using live camera input directly from the user's device.

The CNN model is served via a **Flask backend**, and the frontend uses the browser's **MediaDevices API** to capture images, making it feel like a native mobile scanner — installable, offline-capable, and fast.

**Key Highlights:**
- 📷 Real-time leaf scanning via **device camera** (MediaDevices API)
- 🧠 CNN model classifies leaves as **Healthy** or **Diseased** with a confidence score
- 🔄 Full preprocessing pipeline on the server (decode → RGB → resize → normalize → reshape)
- 📡 JSON response from Flask backend to dynamic frontend UI
- 📱 **PWA** — installable on mobile, fullscreen app-like experience, offline support via service worker
- ☁️ Heroku-ready with `Procfile` configuration
- 📓 Complete training pipeline in Jupyter Notebook

---

## 📦 Dataset

> ### ⬇️ Dataset Link
> **[Click here to access the dataset](https://www.kaggle.com/datasets/vineetm1204/dataset)**

The dataset contains labeled images of healthy and diseased plant leaves across multiple species, organized by class and split into training and validation sets.

**Expected Dataset Structure:**
```
dataset/
├── train/
│   ├── Healthy/
│   ├── Diseased/
│   └── ...
└── val/
    ├── Healthy/
    ├── Diseased/
    └── ...
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Model Training** | Python, TensorFlow, Keras, NumPy |
| **Backend** | Flask (Python) |
| **Image Processing** | Pillow / OpenCV, base64 |
| **Frontend** | HTML5, CSS3, JavaScript (MediaDevices API) |
| **PWA** | Service Worker, Web App Manifest |
| **Notebook** | Jupyter Notebook |
| **Deployment** | Heroku (Procfile) |
| **Model Format** | HDF5 (`.h5`) |

---

## 📁 Project Structure

```
Plant-Disease-Model/
│
├── static/                   # CSS, JS, service worker, manifest
├── templates/                # Jinja2 HTML templates
│   └── index.html            # Main camera UI
│
├── app.py                    # Flask app — routes & prediction logic
├── model.h5                  # Trained Keras CNN model
├── requirements.txt          # Python dependencies
├── Procfile                  # Heroku deployment config
│
└── Plant-Disease-Detection-Using-Machine-Learning
    Project by Vineet Mittal.ipynb   # Full model training notebook
```

---

## ⚙️ How It Works

The **Leaf Health Scanner** detects whether a plant leaf is healthy or diseased using real-time camera input — here's the complete pipeline:

---

### 1. 📷 Image Capture
The app accesses the device camera via the browser's **MediaDevices API**. The user captures a leaf image directly within the web interface — no file upload required.

---

### 2. 🔄 Image Preprocessing
The captured image is encoded as **base64** and sent to the Flask backend. The server then:
- Decodes the base64 string and converts it to **RGB format**
- **Resizes** the image to the model's required input dimensions
- **Normalizes** pixel values to the range `[0, 1]`
- **Reshapes** the array into a batch format `(1, H, W, 3)` suitable for the model

---

### 3. 🧠 Model Prediction
The preprocessed image is passed through a **Convolutional Neural Network (CNN)** trained on a plant disease dataset. The model outputs a **probability score** between 0 and 1.

---

### 4. 📊 Result Interpretation

| Probability | Classification |
|---|---|
| **> 0.5** | 🔴 Diseased |
| **≤ 0.5** | 🟢 Healthy |

A **confidence score** is derived from the prediction probability and included in the response.

---

### 5. 📡 Response to Frontend
The Flask backend returns a **JSON response**:
```json
{
  "prediction": "Diseased",
  "confidence": "92.3%"
}
```

---

### 6. 🖥️ Display Output
The frontend dynamically updates the UI to show:
- ✅ **Prediction result** — Healthy 🟢 or Diseased 🔴
- 📈 **Confidence percentage**

---

### 7. 📱 Progressive Web App (PWA)
The application is built as a **PWA**, enabling users to:
- **Install** it on their phone like a native app
- Use it in a **fullscreen, app-like interface**
- Access basic functionality **offline** via service worker caching

---

### 🔁 Full Workflow

```
📷 Device Camera
       │
       ▼
🖼️  Image Captured (MediaDevices API)
       │
       ▼
📦 Encoded as Base64 → Sent to Flask Backend
       │
       ▼
🔄 Preprocessing
   Decode → RGB → Resize → Normalize → Reshape
       │
       ▼
🧠 CNN Model Inference  (model.h5)
       │
       ▼
📊 Probability Score → Threshold Check (> 0.5 = Diseased)
       │
       ▼
📡 JSON Response  { prediction, confidence }
       │
       ▼
🖥️  UI Dynamically Updated → Result Displayed
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip
- A device with a camera (for full PWA experience)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/vineetm1204-m/Plant-Disease-Model.git
cd Plant-Disease-Model

# 2. Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the Flask app
python app.py
```

Open your browser and visit: **`http://localhost:5000`**

> **Note:** Camera access requires HTTPS in production. Use a tool like `ngrok` for local HTTPS tunneling if testing on mobile.

---

## 🖥️ Usage

1. Open the web app (or install it as a PWA on mobile)
2. Allow **camera access** when prompted
3. Point the camera at a plant leaf
4. Tap **"Capture"** to take the photo
5. View the instant result — **Healthy 🟢** or **Diseased 🔴** — with a confidence score

> **Tip:** For best accuracy, use a well-lit leaf with no heavy shadows. Center the leaf in frame before capturing.

---

## 🧠 Model Details

| Parameter | Value |
|---|---|
| **Architecture** | Convolutional Neural Network (CNN) |
| **Framework** | Keras + TensorFlow |
| **Input Shape** | `(224, 224, 3)` |
| **Output** | Binary probability (Healthy / Diseased) |
| **Decision Threshold** | `0.5` |
| **Saved Format** | HDF5 — `model.h5` |

The complete training pipeline — data loading, augmentation, model architecture, training loop, accuracy/loss curves, and evaluation — is documented in:

📓 [`Plant-Disease-Detection-Using-Machine-Learning Project by Vineet Mittal.ipynb`](./Plant-Disease-Detection-Using-Machine-Learning%20Project%20by%20Vineet%20Mittal.ipynb)

---

## ☁️ Deployment

This project is Heroku-ready via the included `Procfile`.

```bash
heroku create your-app-name
git push heroku main
heroku open
```

> **Important:** Camera features require **HTTPS**. Heroku apps run on HTTPS by default — no extra setup needed.
> Ensure `gunicorn` is present in `requirements.txt`.

---

## 👨‍💻 Author

**Vineet Mittal**
B.Tech Student | Amity University, Gwalior

[![GitHub](https://img.shields.io/badge/GitHub-vineetm1204--m-181717?style=flat&logo=github)](https://github.com/vineetm1204-m)

---

<div align="center">

Made with 🌿 and Python

*Found this useful? Give it a ⭐ on GitHub!*

</div>
