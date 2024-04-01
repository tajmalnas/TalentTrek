import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "./ui/button";
import { File } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExcelToJsonForm = () => {
  const navigate = useNavigate();

  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  // handle File
  const fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);

      localStorage.setItem("shortlist", JSON.stringify({ excelData }));
      console.log(excelData);
      if (excelData) {
        navigate("/shortlisted-candidates");
      }
    } else {
      setExcelData(null);
    }
  };

  return (
    <div>
      {" "}
      <div>
        <form
          className="flex flex-col"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <label>
            <h5 className="flex gap-2 items-center text-lg font-medium tracking-wide">
              <File size={20} />
              Upload Excel file
            </h5>
          </label>
          <br></br>
          <input type="file" onChange={handleFile} required></input>
          {excelFileError && <div>{excelFileError}</div>}
          <div className="flex mt-6 justify-end">
            <Button
              className="bg-emerald-500 hover:bg-emerald-600"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExcelToJsonForm;
