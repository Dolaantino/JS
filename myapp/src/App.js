// App.js

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import ErrorModal from './ErrorModal';

const App = () => {
  const [fileData, setFileData] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('fileData');
    if (storedData) {
      setFileData(JSON.parse(storedData));
      setIsFileUploaded(true);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file && file.name.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        encoding: 'Windows-1251',
        complete: (result) => {
          setFileData(result.data);
          setIsFileUploaded(true);
          localStorage.setItem('fileData', JSON.stringify(result.data));
        },
      });
    } else {
      setErrorMessage('Неправильный формат файла, разрешены только файлы .CSV');
    }
  };

  const handleLoadNewFile = () => {
    localStorage.removeItem('fileData');
    setFileData([]);
    setIsFileUploaded(false);
    setErrorMessage('');
  };

  return (
    <div className={`app ${isFileUploaded ? 'page-white' : 'page-gray'}`}>
      {isFileUploaded ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Номер телефона</th>
                <th>Email</th>
                <th>Дата рождения</th>
                <th>Адрес</th>
              </tr>
            </thead>
            <tbody>
              {fileData.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.bday}</td>
                  <td>{user.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="white-window upload-container center-content">
          {errorMessage && <ErrorModal message={errorMessage} />}
          <div className="upload-text">Выберите файл в формате CSV</div>
          <label className="upload-button upload-file-button">
            Выберите файл
            <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
        </div>
      )}
      {isFileUploaded && (
        <div className="load-new-file-container">
          <button
            className="upload-button load-new-file-button"
            onClick={handleLoadNewFile}
          >
            Загрузить новый файл
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
