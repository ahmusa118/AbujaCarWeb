import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input,message } from 'antd';
import {  createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "firebase/auth"
import { auth } from './firebase/firebaseConfig'
const Socialadminsignin = () => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handleSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Signed up 
      const user = userCredential.user;
      if(user.email){message.success('success')}
      // ...
    } catch (error) {
      setLoading(false);
      console.error('Error logging in:', error);
      message.error('An error occurred while signing up');
    }
  };
  

  return (
    <Form className="p-6 sm:w-1/2 mx-auto">
    <Form.Item label="Email address">
      <Input
        type="email"
        className=""
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
    </Form.Item>

    <Form.Item label="Password">
      <Input.Password
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        value={password}
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2"
      />
    </Form.Item>

    <Form.Item>
      <Button
        disabled={isLoading || !email || !password}
        onClick={handleSubmit}
        className="mb-2"
      >
        {isLoading ? 'Loading…' : 'Sign up'}
      </Button>
    </Form.Item>

    
   
  
  </Form>
  );
};

export default Socialadminsignin;
