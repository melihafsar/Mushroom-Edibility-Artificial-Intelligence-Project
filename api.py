from typing import Annotated, Union

from fastapi import FastAPI
from fastapi import FastAPI, File, UploadFile
from ultralytics import YOLO
import cv2
import numpy as np

app = FastAPI()


model = YOLO("./best.pt") 


@app.post("/predict")
def read_item(file: Annotated[UploadFile, File()]):
    # Read the image using OpenCV
    image = cv2.imdecode(np.frombuffer(file.file.read(), np.uint8), cv2.IMREAD_COLOR)
    # Convert the image to a 3-dimensional numpy array
    image_array = np.array(image)
    print(image_array.shape)

    results = model.predict(image_array)
    
    # Return the result
    return {"probs": results[0].probs.data.cpu().tolist(), "names": results[0].names}