import React from 'react';
import '../styles/Documents.css'; // Import your CSS file
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";

function DocumentPage() {

interface User {
  id: number;
  name: string;
  email: string;
  designation: string;
  gender:string;
  image: string;
}


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>();
  const handleDocumentUpload = async () => {
    try {
      if (!selectedFile) {
        throw new Error("No file selected");
      }
  
      const formData = new FormData();
      formData.append("document", selectedFile);
  
      const response = await axios.put(
        `http://localhost:5000/get/document/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Document uploaded successfully:", response.data);
      toast.success("Document uploaded successfully", {
        className: "toastify-success",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Error uploading document", {
        className: "toastify-error",
      });
    }
  };
  
  return (
    <div className="document-container">
      <div className="document-image">
      <label>Profile Picture</label>
            <input
              type="file"
              onChange={(e) => {
                const files = e.target.files;
                if (files != null) {
                  setSelectedFile(files[0]);
                }
              }}
            />
      <button className="btn-upload" onClick={handleDocumentUpload}>
              Upload
            </button>
      </div>
      <div className="buttons-container">
        <button className="upload-button">Upload</button>
        <button className="download-button">Download</button>



      </div>
    </div>
  );
}

export default DocumentPage;
