import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input,message } from 'antd';
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth } from './firebase/firebaseConfig'


const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  const fetchData = async (key) => {
    try {
      const response = await fetch('https://abujacar.org/api/userdashboard', {
        method: 'GET',
        headers: { Authorization: `Bearer ${key}` },
      });


      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData)
        if (responseData.verified === 'No') {
          Navigate('/datapage', { state: responseData });
        } else {
          Navigate('/uploadcar', { state: responseData });
        }
      } else {
        message.error('Error fetching data from the server');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('An error occurred while fetching data');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://abujacar.org/api/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      setLoading(false);
      setEmail('');
      setPassword('');

      if (response.ok) {
        const data = await response.json();

        if (data.token) {
   
          await fetchData(data.token);
        } else if (data.error) {
          message.error(data.error);
        }
      } else {
        setLoading(false);
        alert('Error logging in');
      }
    } catch (error) {
      setLoading(false);
    
      alert('An error occurred while logging in');
      console.log(error)
    }
  };
const handleGoogle= async(e)=>{
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    alert('success') // Update state on successful sign-in
  } catch (error) {
    console.error(error); // Handle sign-in errors
    alert(); // Update state on sign-in failure
  }
}
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
        {isLoading ? 'Loading…' : 'Submit'}
      </Button>
    </Form.Item>
    <p>
      Don't have an account as a seller?{' '}
      <span onClick={() => Navigate('/sellersignup')} style={{ cursor: 'pointer', color: 'blue' }}>
        Sign up here
      </span>
      .
    </p>
    
    <p>
      <span onClick={() => Navigate('/forgotsellerpassword')} style={{ cursor: 'pointer', color: 'blue' }}>
        Forgot your password?
      </span>
    </p>
  </Form>
  );
};

export default Login;
