import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';

interface UserData {
  name: string;
  phone: string;
  email: string;
  bday: string;
  address: string;
}

const App: React.FC = () => {
  const [fileData, setFileData] = useState<UserData[]>([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('fileData');
    if (storedData) {
      setFileData(JSON.parse(storedData));
      setIsFileUploaded(true);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.name.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          setFileData(result.data);
          setIsFileUploaded(true);
          localStorage.setItem('fileData', JSON.stringify(result.data));
        },
      });
    } else {
      alert('Неправильный формат файла, разрешены только файлы .CSV');
    }
  };

  const handleLoadNewFile = () => {
    localStorage.removeItem('fileData');
    setFileData([]);
    setIsFileUploaded(false);
  };

  return (
    <div className="app">
      {isFileUploaded ? (
        <div>
          <button onClick={handleLoadNewFile}>Загрузить новый файл</button>
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
        <div className="upload-container">
          <div>Выберите файл в формате CSV</div>
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
      )}
    </div>
  );
};

export default App;
