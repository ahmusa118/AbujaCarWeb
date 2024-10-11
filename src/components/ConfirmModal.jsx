import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ show, onConfirm, onCancel, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <p>{message}</p>
        <div className="confirm-modal-buttons">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
