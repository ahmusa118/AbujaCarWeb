import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';


const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  const fetchData = async (key) => {
    try {
      const response = await fetch('https://abujacar.org/api/inspectordashboard', {
        method: 'GET',
        headers: { Authorization: `Bearer ${key}` },
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        // Store responseData in local storage
        localStorage.setItem('inspectordata', JSON.stringify(responseData));
  
        // Navigate to '/inspectordb'
        Navigate('/inspectordb', { state: responseData });
      } else {
        alert('Error fetching data from server');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data');
    }
  };
  ;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://abujacar.org/api/inspectorlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      setEmail('');
      setPassword('');

      if (response.ok) {
        const data = await response.json();

        if (data.token) {
          setLoading(false);
          await fetchData(data.token);
        } else if (data.error) {
          alert(data.error);
        }
      } else {
        setLoading(false);
        alert('Error logging in');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error logging in:', error);
      alert('An error occurred while logging in');
    }
  };

  return (
    <Form className="p-6 sm:w-1/2 mx-auto">
      <Form.Item label="Email address">
        <Input
          type="email"
          className="mb-6"
          placeholder="Enter email"
          onChange={(text) => setEmail(text.target.value)}
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
          onChange={(text) => setPassword(text.target.value)}
          className="mb-2"
        />
      </Form.Item>

      {email && password ? (
        <Form.Item>
          <Button type="primary" disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? 'Loading…' : 'Submit'}
          </Button>
        </Form.Item>
      ) : (
        <button></button>
      )}
    </Form>
  );
};

export default Login;
