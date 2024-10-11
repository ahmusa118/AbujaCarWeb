import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { useLocation } from 'react-router-dom';

const Abujacardatapage = () => {
  const location = useLocation();
  const [nin, setNin] = useState('');
  const [ninImage, setNinImage] = useState(null);
  const [utilityBillImage, setUtilityBillImage] = useState(null);
  const [isNinSuccessful, setIsNinSuccessful] = useState(null);
  const [isUtilityBillSuccessful, setIsUtilityBillSuccessful] = useState(null);
  const [status, setStatus] = useState('');
const [loading,setLoading]=useState(false)
  const handleNinChange = (e) => {
    setNin(e.target.value);
  };

  const handleNinImageUpload = (e) => {
    const file = e.target.files[0];
    setNinImage(file);
    setIsNinSuccessful(null); // Reset NIN success state when a new image is uploaded
  };

  const handleUtilityBillImageUpload = (e) => {
    const file = e.target.files[0];
    setUtilityBillImage(file);

    setIsUtilityBillSuccessful(null); // Reset utility bill success state when a new image is uploaded
  };

  const isNinValid = nin.length === 11;
  const isDocumentsUploaded = isNinValid && ninImage && utilityBillImage;
  const normalizeAddress = (address) => {
    return address.toLowerCase().replace(/street\s*/g, '').trim();
  };

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!isDocumentsUploaded) {
      alert('Please upload both documents and ensure the NIN has 11 digits.');
      setLoading(false); // Move setLoading(false) inside the early return
      return;
    }

    const ninFileReader = new FileReader();
    ninFileReader.onload = () => {
      const imageDataUrl = ninFileReader.result;
      Tesseract.recognize(imageDataUrl, 'eng').then(({ data: { text } }) => {
        const isNinPresent = text.includes(nin);
        setIsNinSuccessful(isNinPresent ? 'success' : 'failed');
      });
    };
    ninFileReader.readAsDataURL(ninImage);
  
    const utilityBillFileReader = new FileReader();
    utilityBillFileReader.onload = () => {
      const imageDataUrl = utilityBillFileReader.result;
      Tesseract.recognize(imageDataUrl, 'eng').then(({ data: { text } }) => {
        const normalizedAddress = normalizeAddress(location.state.address);
        const isAddressPresent = text.toLowerCase().includes(normalizedAddress.toLowerCase());
        setIsUtilityBillSuccessful(isAddressPresent ? 'success' : 'failed');
        setLoading(false); // Move setLoading(false) here
      });
    };
    utilityBillFileReader.readAsDataURL(utilityBillImage);
  };
  const successdata = async () => {
    try {
      // First, alter the MongoDB record
      const postdataResponse = await fetch(`https://abujacar.org/api/socialpostdata/${location.state.email}/${ninImage.name}/${utilityBillImage.name}/${nin}`, {
        method: 'PUT',
      });
  
      if (postdataResponse.ok) {
        const postData = await postdataResponse.json();


        // Second, upload documents to the uploads folder
        const formData = new FormData();
        formData.append('ninImage', ninImage);
        formData.append('utilityBillImage', utilityBillImage);
  
        const uploadImagesResponse = await fetch(`https://abujacar.org/api/socialupload-images/${location.state.email}`, {
          method: 'POST',
          body: formData,
        });
  
        if (uploadImagesResponse.ok) {
          const uploadImagesData = await uploadImagesResponse.json();
          console.log(uploadImagesData);
        } else {
          alert('Error uploading images:');
        }
      } else {
        alert('Error updating record:');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

 
  useEffect(() => {
    // Check status only when both scans are successful
    if (isNinSuccessful === 'success' && isUtilityBillSuccessful === 'success') {
      setStatus('success');
      successdata()
    } else if (isNinSuccessful === 'failed' || isUtilityBillSuccessful === 'failed') {
      setStatus('failed');
    } else {
      setStatus('');
    }
  }, [isNinSuccessful, isUtilityBillSuccessful]);
if(loading){
  return (<div>loading...</div>)
}

else{
  return (
    <section>
      <label htmlFor="nin">NIN:</label>
      <input type="text" id="nin" value={nin} onChange={handleNinChange} />

      <div>
        <label htmlFor="ninImageUpload">Upload Passport with NIN or NIN slip/card (JPG or PNG):</label>
        <input type="file" id="ninImageUpload" accept=".jpg, .jpeg, .png" onChange={handleNinImageUpload} />
      </div>

      <div>
        <label htmlFor="utilityBillImageUpload">Upload Utility Bill (JPG or PNG):</label>
        <input type="file" id="utilityBillImageUpload" accept=".jpg, .jpeg, .png" onChange={handleUtilityBillImageUpload} />
      </div>

      {isNinValid && ninImage && utilityBillImage && (
        <button onClick={handleScan}>Scan</button>
      )}

      {status === 'failed' && <p>Verification Failed</p>}
      {status === 'success' && <p>Verification Completeted. please log out and log in again</p>}
    </section>
  );
};
}
export default Abujacardatapage;
