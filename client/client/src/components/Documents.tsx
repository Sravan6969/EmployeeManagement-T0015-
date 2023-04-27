import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import "../styles/Documents.css";

import { GoDesktopDownload } from 'react-icons/go';

interface Document {
  id: number;
  Name: string;
  ServerRelativeUrl: string;
}

function DocumentPage() {
  const [files, setFiles] = useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/get/documentView/${id}`
        );
        const files = response.data;
        console.log("this is working!!", files);
        console.log(response.data);

        console.log(typeof files);
        setFiles(files);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleDocumentUpload = async () => {
    try {
      if (!selectedFile) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

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
      alert("Document uploaded successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("Error uploading document");
    }
  };

  const downloadFile = async (serverRelativePath?: string) => {
    try {
      if (!serverRelativePath) {
        throw new Error('serverRelativePath parameter is required');
      }
      const response = await axios.get(`/get/document/${id}`, {
        params: { serverRelativePath },
        paramsSerializer: (params) => {
          return qs.stringify(params, { encode: false });
        },
        responseType: 'blob',
      });
      const blob = new Blob([response.data]);
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.setAttribute(
        'download',
        serverRelativePath.split('/').pop() || ''
      );
      document.body.appendChild(downloadLink);
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="document-container">
      <div className="document-image">
        <h1 className="add-doc">ADD DOCUMENT</h1>
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

      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {files &&
            Array.isArray(files) &&
            files.map((file) => (
              <tr key={file?.Name}>
                <td>{file?.Name}</td>
                <td>
                <h3><GoDesktopDownload/> </h3>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default DocumentPage;
