import { useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function DragDropFiles({ onDataChange }: any) {
  const [files, setFiles] = useState<File | null>(null);

  const inputRef = useRef();

  const handleDragOver = (e: Event) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    file && setFiles(file);
    onDataChange("");
  };

  const handleUpload = async () => {
    const id = toast.loading("Uploading files...");
    const start = new Date().getTime();

    await axios
      .post(
        "http://localhost:8000/predict",
        {
          file: files,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        onDataChange(response.data);
        toast.update(id, {
          render: "Files uploaded successfully!",
          type: "success",
          isLoading: false,
          closeOnClick: true,
          autoClose: 4000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.update(id, {
          render: "Error uploading files!",
          type: "error",
          isLoading: false,
          closeOnClick: true,
          autoClose: 4000,
        });
      });
    const end = new Date().getTime();
    const time = end - start / 1000;
    toast.success(`Time: ${time} seconds`);
  };

  if (files) {
    return (
      <div className="image-preview">
        <img
          src={files && URL.createObjectURL(files)}
          alt="file"
          style={{ width: "100%", maxHeight: "80%", objectFit: "cover" }}
        />
        <div className="files">
          <div className="action-buttons">
            <button onClick={handleUpload}>Upload</button>
            <button
              className="button button-cancel"
              onClick={() => {
                setFiles(null);
                onDataChange("");
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!files && (
        <div
          className="dropzone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={(e) => {
              setFiles(e.target.files[0]);
              onDataChange("");
            }}
            hidden
            ref={inputRef}
          />
          <button
            className="file-select-button"
            onClick={() => {
              inputRef.current.click();
            }}
          >
            Select File
          </button>
        </div>
      )}
    </>
  );
}

export default DragDropFiles;
