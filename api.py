from typing import Annotated

from fastapi import FastAPI
from fastapi import FastAPI, File, UploadFile
from ultralytics import YOLO
import cv2
import numpy as np
from keras.models import load_model

app = FastAPI()


yolo = YOLO("./best.pt") 
cnn = load_model("cnn.h5")



def yolo_predict(image):
    # Convert the image to a 3-dimensional numpy array
    image_array = np.array(image)
    print(image_array.shape)

    results = yolo.predict(image)


    return results[0].probs.data.cpu().tolist()

def cnn_predict(image):
    resized = cv2.resize(image, (128, 128), interpolation=cv2.INTER_LINEAR)
    # Convert the image to a 3-dimensional numpy array
    image_array = np.array(resized).reshape(1, 128, 128, 3)
    print(image_array.shape)

    results = cnn.predict(image_array)

    return results.tolist()

@app.post("/predict")
def read_item(file: Annotated[UploadFile, File()]):
    # Read the image using OpenCV
    image = cv2.imdecode(np.frombuffer(file.file.read(), np.uint8), cv2.IMREAD_COLOR)

    yolo = yolo_predict(image)

    cnn = cnn_predict(image)

    # Return the result
    return {"yolo": yolo, "cnn": cnn, "names": ["edible", "poisonous"]}