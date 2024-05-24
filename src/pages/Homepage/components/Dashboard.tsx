import DragDropFiles from "./DragAndDropFiles";
import { useEffect, useState } from "react";

type FileContentData = {
  yolo: number[];
  cnn: number[][];
  names: string[];
};

function Dashboard() {
  const [fileContentData, setFileContentData] =
    useState<FileContentData | null>(null);

  const handleDataChange = (data: any) => {
    setFileContentData(data);
  };

  useEffect(() => {
    console.log(fileContentData);
  }, [fileContentData]);

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
                  <div style={{ textAlign: "center", gap: "4px" }}>
                    Yolo Prediction:
                    <p style={{ textAlign: "center" }}>
                      {` ${(fileContentData.yolo[0] * 100).toFixed(
                        2
                      )}% edible -- ${(fileContentData.yolo[1] * 100).toFixed(
                        2
                      )}% poisonous`}
                    </p>
                  </div>
                  <div style={{ textAlign: "center", gap: "4px" }}>
                    CNN Prediction:
                    <p style={{ textAlign: "center" }}>
                      {` ${(fileContentData.cnn[0][0] * 100).toFixed(
                        2
                      )}% edible -- ${(fileContentData.cnn[0][1] * 100).toFixed(
                        2
                      )}% poisonous`}
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
