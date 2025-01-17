import DragDropFiles from "./DragAndDropFiles";
import { useState } from "react";

type FileContentData = {
  yolo: number[];
  cnn: number[][];
  ann: number[][];
  names: string[];
};

function Dashboard() {
  const [fileContentData, setFileContentData] =
    useState<FileContentData | null>(null);

  const handleDataChange = (data: any) => {
    setFileContentData(data);
  };

  //   data:{
  //     "yolo": [
  //         0.2892216444015503,
  //         0.7107783555984497
  //     ],
  //     "cnn": [
  //         [
  //             0,
  //             1
  //         ]
  //     ],
  //     "names": [
  //         "edible",
  //         "poisonous"
  //     ]
  // }

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-header">
          <h3>
            Drag and drop the file to upload it, or click the button to select
          </h3>
        </div>
        <div className="dashboard-body">
          <div className="dashboard-card-wrapper">
            <div className="card card-upload">
              <DragDropFiles onDataChange={handleDataChange} />
            </div>
            <div className="card card-text">
              {fileContentData && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "50px",
                    margin: "10px",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      gap: "4px",
                      fontSize: "1.5rem",
                    }}
                  >
                    Yolo Prediction:
                    <p style={{ textAlign: "center" }}>
                      {` ${(fileContentData.yolo[0] * 100).toFixed(2)}% ${
                        fileContentData.names[0]
                      } -- ${(fileContentData.yolo[1] * 100).toFixed(2)}% ${
                        fileContentData.names[1]
                      }`}
                    </p>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      gap: "4px",
                      fontSize: "1.5rem",
                    }}
                  >
                    CNN Prediction:
                    <p style={{ textAlign: "center" }}>
                      {` ${(fileContentData.cnn[0][0] * 100).toFixed(2)}% ${
                        fileContentData.names[0]
                      } -- ${(fileContentData.cnn[0][1] * 100).toFixed(2)}% ${
                        fileContentData.names[1]
                      }`}
                    </p>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      gap: "4px",
                      fontSize: "1.5rem",
                    }}
                  >
                    ANN Prediction:
                    <p style={{ textAlign: "center" }}>
                      {` ${(fileContentData.ann[0][0] * 100).toFixed(2)}% ${
                        fileContentData.names[0]
                      } -- ${(fileContentData.ann[0][1] * 100).toFixed(2)}% ${
                        fileContentData.names[1]
                      }`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
