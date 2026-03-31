const video = document.getElementById('video');

// Access mobile back camera
navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
})
.then(stream => {
    video.srcObject = stream;
})
.catch(err => {
    alert("Camera not accessible");
});

function capture() {
    const loader = document.getElementById('loader');
    loader.style.display = "block";

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
        loader.style.display = "none";

        document.getElementById('result').innerText = data.result;
        document.getElementById('confidence').innerText =
            "Confidence: " + data.confidence.toFixed(2) + "%";
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