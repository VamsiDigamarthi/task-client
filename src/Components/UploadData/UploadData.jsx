import React, { useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";

import "./UpdalosData.css";
import { API } from "../../Core/url";

const ExcelFileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const fileType = file.type;
      const reader = new FileReader();

      reader.onload = async (event) => {
        const fileData = event.target.result;

        if (
          fileType ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          fileType === "application/vnd.ms-excel"
        ) {
          const workbook = XLSX.read(fileData, { type: "array" });
          const jsonData = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]]
          );

          console.log("Excel Data:", jsonData);

          await sendDataToServer(jsonData);
        } else if (fileType === "text/csv") {
          Papa.parse(fileData, {
            header: true,
            complete: async (results) => {
              console.log("CSV Data:", results.data);

              await sendDataToServer(results.data);
            },
          });
        } else {
          alert("Please upload a valid Excel or CSV file.");
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert("Please select an Excel or CSV file to upload.");
    }
  };

  const sendDataToServer = async (data) => {
    try {
      const response = await API.post("/data", data);
      console.log("Server Response:", response.data);
      alert("Data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Error uploading data. Please try again.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="heading">Upload Excel or CSV File</h2>
        <div className="file-input-wrapper">
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileChange}
            className="file-input"
            id="file-upload"
          />
          <label className="file-label" htmlFor="file-upload">
            {file ? file.name : "Choose an Excel or CSV file..."}
          </label>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExcelFileUpload;
