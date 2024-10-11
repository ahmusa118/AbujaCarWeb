import React, { useState } from 'react';
import './Settings.css';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal'; // Import the modal component

const Settings = ({ email }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://abujacar.org/api/deleteuser/${email}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLoading(false);
        navigate('/sellerLogin'); // Navigate to the seller login page
      } else {
        setLoading(false);
        alert('Failed to delete the account.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error deleting account:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const confirmDeleteAccount = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    handleDeleteAccount();
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };
if(loading){return <div>loading...</div>}
else{
  return (
    <div className="settings-container">
      <h1 className="settings-title">Account Settings</h1>
      <p className="email-display">{email}</p>
      <button className="logout-button" onClick={() => navigate('/sellerLogin')}>Logout</button>
      <button className="delete-button" onClick={confirmDeleteAccount}>
        Delete Account
      </button>

      <ConfirmModal
        show={showConfirmModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </div>
  );
};}

export default Settings;
