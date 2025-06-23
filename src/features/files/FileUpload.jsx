import React, { useState } from "react";
import api from "../../services/api";

export default function FileUpload({ onUploaded }) {
  const [file, setFile] = useState(null);

  const handleFileSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await api.post("/files", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });                                                     // Upload file[4]
      onUploaded(data);
      setFile(null);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  return (
    <form onSubmit={handleFileSubmit}>
      <input type="file" onChange={e => setFile(e.target.files[0])} required />
      <button type="submit">Upload File</button>
    </form>
  );
}
