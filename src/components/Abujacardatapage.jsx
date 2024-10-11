import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './datastyle.css';

const API_KEY = 'AIzaSyB_1rkPaB2ydYP3dU___ZoJOyMuDwCjxco'; // Replace with your actual API key

const Abujacardatapage = () => {
  const location = useLocation();
  const [documentType, setDocumentType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
    setFirstName('');
    setLastName('');
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setIsSuccessful(null); // Reset success state when a new image is uploaded
  };

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!firstName || !lastName) {
      alert('Please fill out all fields.');
      setLoading(false);
      return;
    }

    if (!image) {
      alert('Please upload a document.');
      setLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];
      
      try {
        const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64Image,
                },
                features: [
                  {
                    type: 'TEXT_DETECTION',
                    maxResults: 1,
                  },
                ],
              },
            ],
          }),
        });

        const data = await response.json();
        const text = data.responses[0]?.fullTextAnnotation?.text || '';
        const lowerCaseText = text.toLowerCase();

        const isFirstNamePresent = lowerCaseText.includes(firstName.toLowerCase());
        const isLastNamePresent = lowerCaseText.includes(lastName.toLowerCase());
        setIsSuccessful(isFirstNamePresent && isLastNamePresent ? 'success' : 'failed');
      } catch (error) {
        console.error('Error during OCR:', error);
        setIsSuccessful('failed');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(image);
  };

  const successdata = async () => {
    try {
      console.log(image.name)
      const postdataResponse = await fetch(`https://abujacar.org/api/postdata/${location.state.email}/${image.name}/${image.name}`, {
        method: 'PUT',
      });

      if (postdataResponse.ok) {
        const postData = await postdataResponse.json();
        console.log('Post Data Response:', postData);

        const formData = new FormData();
        formData.append('ninImage', image);

        const uploadImagesResponse = await fetch(`https://abujacar.org/api/upload-images/${location.state.email}`, {
          method: 'POST',
          body: formData,
        });

        if (uploadImagesResponse.ok) {
          const uploadImagesData = await uploadImagesResponse.json();
          alert('Image uploaded successfully');
          console.log('Upload Images Response:', uploadImagesData);
        } else {
          alert('Error uploading images');
          const errorText = await uploadImagesResponse.text();
          console.log('Upload Images Error:', uploadImagesResponse.status, errorText);
        }
      } else {
        const errorText = await postdataResponse.text();
        console.log('Post Data Error:', postdataResponse.status, errorText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request. Please try again.');
    }
  };

  useEffect(() => {
    if (isSuccessful === 'success') {
      setStatus('success');
      successdata();
    } else if (isSuccessful === 'failed') {
      setStatus('failed');
    } else {
      setStatus('');
    }
  }, [isSuccessful]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="form-section">
      <label htmlFor="documentType" className="form-label">Select Document Type:</label>
      <select id="documentType" value={documentType} onChange={handleDocumentTypeChange} className="form-select">
        <option value="">Select Document Type</option>
        <option value="NIN">NIN</option>
        <option value="Driver's License">Driver's License</option>
        <option value="International Passport">International Passport</option>
        <option value="Voter's Card">Voter's Card</option>
      </select>

      <label htmlFor="firstName" className="form-label">First Name:</label>
      <input type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} className="form-input" />

      <label htmlFor="lastName" className="form-label">Last Name:</label>
      <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} className="form-input" />

      <div className="form-group">
        <label htmlFor="imageUpload" className="form-label">Upload Document (JPG or PNG):</label>
        <input type="file" id="imageUpload" accept=".jpg, .jpeg, .png" onChange={handleImageUpload} className="form-file-input" />
      </div>

      {(firstName && lastName) && image && (
        <button onClick={handleScan} className="form-button">Scan</button>
      )}

      {status === 'failed' && <p className="error-message">Verification Failed</p>}
      {status === 'success' && <p className="success-message">Verification Completed. Please log out and log in again.</p>}
    </section>
  );
};

export default Abujacardatapage;
