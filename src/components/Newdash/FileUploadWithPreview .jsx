import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { TiDeleteOutline } from "react-icons/ti";

const FileUploadWithPreview = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);

    // Create a preview URL for the selected file
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleDelete = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="max-w-md mx-auto mt-3">
      {!previewUrl && (
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-gray-400 rounded-lg p-2 w-[100px] h-[100px] flex flex-col items-center justify-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <p className="text-gray-500 text-[13px]">
            Drag and drop a file here, or click to select a file
          </p>
        </div>
      )}
      {previewUrl && (
        <div className="mt-4">
          <div className="flex justify-start items-start">
            <img
              src={previewUrl}
              alt="File Preview"
              className="mt-2 rounded-lg w-[100px] h-[100px] object-cover"
            />
            <button
              onClick={handleDelete}
              className="mt-2  text-black px-4 py-2 rounded-lg"
            >
              <TiDeleteOutline />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadWithPreview;
