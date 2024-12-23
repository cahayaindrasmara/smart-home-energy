import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [fileResponse, setFileResponse] = useState(""); // Menyimpan hasil upload file
  const [chatResponse, setChatResponse] = useState(""); // Menyimpan hasil chat
  const [isFileResponse, setIsFileResponse] = useState(false); // Status untuk kontrol output analisis file
  const [isChatResponse, setIsChatResponse] = useState(false); // Status untuk kontrol output chat

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFileResponse(res.data.answer);
      setIsFileResponse(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleChat = async () => {
    try {
      const res = await axios.post("http://localhost:8080/chat", { query });
      setChatResponse(res.data.answer);
      setIsChatResponse(true);
    } catch (error) {
      console.error("Error querying chat:", error);
    }
  };

  return (
    <div style={{
      padding: "10px",
      fontFamily: "Arial, sans-serif",
      // background: "linear-gradient(to right, #a8e063, #56ab2f)",
      minHeight: "100vh"
    }}>
      <h1 style={{
        color: "white",
        textAlign: "center",
        width: "45%",
        margin: "auto",
        marginTop: "30px",
        marginBottom: "100px",
        backgroundColor: "#007bff",
        borderRadius: "5px",
      }}>Smart Home Energy Analysis</h1>

      <div style={{
        display: "flex",
        justifyContent: "flex-start",  // Menggunakan flex-start untuk mengurangi space antar elemen
        alignItems: "flex-start",
        gap: "10px"  // Mengatur jarak antar kolom
      }}>
        {/* Kontainer Upload File */}
        <div style={{
          width: "30%",
          border: "2px solid #007bff",
          borderRadius: "8px",
          padding: "10px",  // Padding lebih kecil
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",  // Mengatur elemen untuk tetap berada di bagian atas
          height: "auto",  // Menyesuaikan tinggi dengan konten
          marginLeft: "100px",
          marginRight: "10px",
        }}>
          <h2 style={{ marginBottom: "5px", color: "#333" }}>Upload File</h2> {/* Margin lebih kecil */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}> {/* Mengurangi gap */}
            <input
              type="file"
              onChange={handleFileChange}
              style={{
                padding: "6px",  // Padding lebih kecil
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                flex: 1
              }}
            />
            <button
              onClick={handleUpload}
              style={{
                padding: "6px 12px",  // Padding tombol lebih kecil
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Upload
            </button>
          </div>

          {/* Output Default File Upload */}
          {!isFileResponse && (
            <div style={{ marginTop: "10px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#fff", overflowY: "auto" }}>
              <h3 style={{ marginBottom: "5px" }}>File Analysis Result</h3> {/* Margin lebih kecil */}
              <p>Upload a file to see the analysis result.</p>
            </div>
          )}

          {/* Output Hasil Upload File */}
          {isFileResponse && (
            <div style={{ marginTop: "10px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#fff", overflowY: "auto" }}>
              <h3 style={{ marginBottom: "5px" }}>File Analysis Result</h3> {/* Margin lebih kecil */}
              <p>{fileResponse}</p>
            </div>
          )}
        </div>

        {/* Kontainer Chat */}
        <div style={{
          width: "30%",
          border: "2px solid #007bff",
          borderRadius: "8px",
          padding: "10px",  // Padding lebih kecil
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",  // Mengatur elemen untuk tetap berada di bagian atas
          height: "auto",  // Menyesuaikan tinggi dengan konten
          flex: "1",
          marginLeft: "10px",
          marginRight: "100px",
        }}>
          <h2 style={{ marginBottom: "5px", color: "#333" }}>Ask with Bot</h2> {/* Margin lebih kecil */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}> {/* Mengurangi gap */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question..."
              style={{
                padding: "6px",  // Padding lebih kecil
                border: "1px solid #ccc",
                borderRadius: "4px",
                flex: 1
              }}
            />
            <button
              onClick={handleChat}
              style={{
                padding: "6px 12px",  // Padding tombol lebih kecil
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Chat
            </button>
          </div>

          {/* Output Default Chat */}
          {!isChatResponse && (
            <div style={{ marginTop: "10px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#fff", overflowY: "auto" }}>
              <h3 style={{ marginBottom: "5px" }}>Chat Response</h3> {/* Margin lebih kecil */}
              <p>Ask a question to the bot.</p>
            </div>
          )}

          {/* Output Hasil Chat */}
          {isChatResponse && (
            <div style={{ marginTop: "10px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#fff", overflowY: "auto" }}>
              <h3 style={{ marginBottom: "5px" }}>Chat Response</h3> {/* Margin lebih kecil */}
              <p>{chatResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
