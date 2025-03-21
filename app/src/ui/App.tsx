import { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [text, setText] = useState("");
  const [isParsingCorrect, setIsParsingCorrect] = useState<boolean>(false);

  const sleep = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

  const handleOpenExcel = async () => {
    const data = await window.electron.openExcel();
    setIsParsingCorrect(data.success);

    if (data.success) {
      toast.success(data.message, { autoClose: 4000 });
    } else {
      toast.error(data.message, { autoClose: 4000 });
    }
    setText(data.message);
  };

  const handleUpload = async () => {
    const data = await window.electron.uploadExcel();
    if (data.success) {
      toast.success(data.message, { autoClose: 4000 });
    } else {
      toast.error(data.message, { autoClose: 4000 });
    }
    setIsParsingCorrect(false);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Cargar Datos Firebase</h1>
        <div className="button-group">
          <button className="btn select-btn" onClick={handleOpenExcel}>
            Seleccoinar archivo Excel
          </button>
          {isParsingCorrect && (
            <button className="btn upload-btn" onClick={handleUpload}>
              Subir Datos
            </button>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
