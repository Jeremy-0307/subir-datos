import { useState } from 'react';
import './App.css';

function App() {
  const [excelData, setExcelData] = useState<boolean | null>(null);
  const [correctParsing, setCorrectParsing] = useState<boolean | null>(null);

  const handleOpenExcel = async () => {
    const data = await window.electron.openExcel();
    setCorrectParsing(data.success === true);
  };

  const handleUpload = async () => {
    const data = await window.electron.uploadExcel();
    console.log(data.message)
    setExcelData(data.success === true);
  };

  return (
    <div className="App">
      <h1>Upload and Display Excel Data</h1>
      
      {excelData === true && correctParsing === true && (
        <h3>Datos subidos correctamente</h3>
      )}

      <button onClick={handleOpenExcel}>Select Excel File</button>

      {correctParsing === true && (
        <button onClick={handleUpload}>Subir Datos</button>
      )}
    </div>
  );
}

export default App;
