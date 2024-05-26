from typing import Annotated, Union

from fastapi import FastAPI, Request
from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from ultralytics import YOLO
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from keras.models import load_model

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/assets", StaticFiles(directory="dist/assets"), name="static")
templates = Jinja2Templates(directory="dist")

yolo = YOLO("./best.pt") 
cnn = load_model("cnn.h5")
ann = load_model("ann.h5")


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


def ann_predict(image):
    resized = cv2.resize(image, (128, 128), interpolation=cv2.INTER_LINEAR)
    # Convert the image to a 3-dimensional numpy array
    image_array = np.array(resized).reshape(1, 128, 128, 3)
    print(image_array.shape)

    results = ann.predict(image_array)

    return results.tolist()


@app.route("/{full_path:path}")
def catch_all(request: Request, full_path: Union[str, None] = None):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/predict")
def read_item(file: Annotated[UploadFile, File()]):
    # Read the image using OpenCV
    image = cv2.imdecode(np.frombuffer(file.file.read(), np.uint8), cv2.IMREAD_COLOR)

    yolo = yolo_predict(image)

    cnn = cnn_predict(image)

    ann = ann_predict(image)

    # Return the result
    return {"yolo": yolo, "cnn": cnn, "ann": ann,  "names": ["edible", "poisonous"]}