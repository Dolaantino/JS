// ErrorModal.js

import React from 'react';
import './ErrorModal.css';

const ErrorModal = ({ message }) => {
  return (
    <div className="error-modal">
      {message}
    </div>
  );
};

export default ErrorModal;
