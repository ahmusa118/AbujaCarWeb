import React, { useState } from 'react';
import emailjs from '@emailjs/browser'
import './AccountDeletionForm.css'; // Assuming you create a separate CSS file

const AccountDeletionForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [option, setOption] = useState('Delete Account');
    const [loading, setLoading] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };



  const handleOptionChange = (e) => {
    setOption(e.target.value);
    if (e.target.value === 'Delete Account') {
      setMessage('I request for my account and related data to be deleted.');
    } else {
      setMessage('');
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_email: email,
      to_email: 'ahmusa118@gmail.com',
      message: option === 'Delete Account' ? 'I request for my account and related data to be deleted.' : message,
      option: option,
    };

    setLoading(true);

    emailjs.send('service_qxr4zxz', 'template_msjn13h', templateParams, 'MnDecPoP0PPy4RKQV')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Your request has been sent successfully.');
        setEmail('');
        setMessage('');
        setOption('Delete Account');
      }, (err) => {
        console.error('FAILED...', err);
        alert('Failed to send your request. Please try again.');
      }).finally(() => setLoading(false));
  };

if(loading){return <div>loading...</div>}
  return (
    <div className="form-container">
      <h2>Request Account Deletion</h2>
     
      <form onSubmit={handleSubmit} className="deletion-form">
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={handleEmailChange} 
          required 
        />

        <label htmlFor="option">Request Type:</label>
        <select id="option" value={option} onChange={handleOptionChange} required>
          <option value="Delete Account">Delete Account</option>
          <option value="Other">Other</option>
        </select>

        {option === 'Other' && (
          <>
            <label htmlFor="message">Message:</label>
            <textarea 
              id="message" 
              value={message} 
              onChange={handleMessageChange} 
              required 
            />
          </>
        )}

        <button type="submit">Send Request</button>
      </form>
    </div>
  );
};

export default AccountDeletionForm;
