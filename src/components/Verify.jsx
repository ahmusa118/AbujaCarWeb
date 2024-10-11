import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Input, Button, message } from 'antd';

const Verify = () => {
  const location = useLocation();
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = async () => {
    try {
      if (verificationCode == location.state.verification) {
        const response = await fetch(`https://abujacar.org/api/verify/${location.state.email}`,{method:'POST'});
 
     const data=await response.json()
     if(data.success==true){
        message.success('Success! Please login')
     }
     else{
        message.error('An error occured')
     }
      } else {
        message.error('Wrong verification code.');
      }
    } catch (error) {
      message.error('Error: Failed to verify.');
    }
  };

  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };

  return (
    <div className='p-4'>
      <h2>Please enter verification code:</h2>
    
      <Input value={verificationCode} onChange={handleChange} />
      <Button className='mt-2' onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default Verify;
