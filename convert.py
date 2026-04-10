import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"   # suppress oneDNN warnings

import tensorflow as tf
import tf2onnx

# Step 1 — Load your .h5 model
print("Loading model.h5 ...")
model = tf.keras.models.load_model("model.h5")
print("Model loaded.")

# Step 2 — Save as SavedModel format (temp folder)
SAVED_MODEL_DIR = "saved_model_tmp"
print(f"Saving to SavedModel format at '{SAVED_MODEL_DIR}' ...")
model.export(SAVED_MODEL_DIR)
print("SavedModel saved.")

# Step 3 — Convert SavedModel → ONNX
print("Converting to ONNX ...")
os.system(
    f"python -m tf2onnx.convert "
    f"--saved-model {SAVED_MODEL_DIR} "
    f"--output model.onnx "
    f"--opset 13"
)

print("\nDone! model.onnx is ready.")
print("You can now delete the 'saved_model_tmp' folder.")