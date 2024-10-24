import "./App.css";

import { Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import ExcelFileUpload from "./Components/UploadData/UploadData";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <Sidebar>
      <Routes>
        <Route path="/upload-data" element={<ExcelFileUpload />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Sidebar>
  );
}

export default App;
