import React from 'react';
import '../styles/Documents.css'; // Import your CSS file

function DocumentPage() {
  return (
    <div className="document-container">
      <div className="document-image">
        <img src="your-document-image.jpg" alt="Your Document" />
      </div>
      <div className="buttons-container">
        <button className="upload-button">Upload</button>
        <button className="download-button">Download</button>
      </div>
    </div>
  );
}

export default DocumentPage;
