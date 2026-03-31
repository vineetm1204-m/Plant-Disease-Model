const video = document.getElementById('video');
const cameraFrame = document.getElementById('cameraFrame');
const startCameraBtn = document.getElementById('startCameraBtn');
const stopCameraBtn = document.getElementById('stopCameraBtn');
const scanBtn = document.getElementById('scanBtn');
const cameraStatus = document.getElementById('cameraStatus');
let streamRef = null;

async function startCamera() {
    if (streamRef) {
        return;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        });

        streamRef = stream;
        video.srcObject = stream;
        video.classList.add('video-on');
        cameraFrame.classList.add('active');

        startCameraBtn.disabled = true;
        stopCameraBtn.disabled = false;
        scanBtn.disabled = false;
        cameraStatus.innerText = "Camera is on";
    } catch (err) {
        cameraStatus.innerText = "Unable to access camera";
        alert("Camera not accessible");
    }
}

function stopCamera() {
    if (streamRef) {
        streamRef.getTracks().forEach(track => track.stop());
        streamRef = null;
    }

    video.srcObject = null;
    video.classList.remove('video-on');
    cameraFrame.classList.remove('active');

    startCameraBtn.disabled = false;
    stopCameraBtn.disabled = true;
    scanBtn.disabled = true;
    cameraStatus.innerText = "Camera is off";
}

function capture() {
    if (!streamRef) {
        cameraStatus.innerText = "Turn camera on before scanning";
        return;
    }

    const loader = document.getElementById('loader');
    loader.classList.add('show');

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 224;
    canvas.height = 224;

    ctx.drawImage(video, 0, 0, 224, 224);

    const imageData = canvas.toDataURL('image/png');

    fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
    })
    .then(res => res.json())
    .then(data => {
        loader.classList.remove('show');

        const resultEl = document.getElementById('result');
        const confidenceEl = document.getElementById('confidence');

        resultEl.innerText = data.result;
        confidenceEl.innerText = "Confidence: " + data.confidence.toFixed(2) + "%";

        resultEl.classList.remove('show');
        confidenceEl.classList.remove('show');
        void resultEl.offsetWidth;
        resultEl.classList.add('show');
        confidenceEl.classList.add('show');
    })
    .catch(() => {
        loader.classList.remove('show');
        cameraStatus.innerText = "Prediction failed, try again";
    });
}

// Install button
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const btn = document.createElement("button");
    btn.innerText = "Install App";

    document.querySelector(".container").appendChild(btn);

    btn.addEventListener("click", () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            deferredPrompt = null;
        });
    });
});