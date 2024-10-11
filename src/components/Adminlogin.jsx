import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';


const Adminlogin = () => {
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const Navigate = useNavigate();

  const fetchData = async (key) => {
    try {
      const response = await fetch('https://abujacar.org/api/admindashboard', {
        method: 'GET',
        headers: { Authorization: `Bearer ${key}` },
      });

      if (response.ok) {
        const responseData = await response.json();
        Navigate('/admincars', { state: responseData });
      } else {
        message.error('Error fetching data from server');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('An error occurred while fetching data');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const response = await fetch('https://abujacar.org/api/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.token) {
          setLoading(false);
          await fetchData(data.token);
        } else if (data.error) {
          message.error(data.error);
        }
      } else {
        setLoading(false);
        message.error('Error logging in');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error logging in:', error);
      message.error('An error occurred while logging in');
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className='p-6'
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="Email address"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email address!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button  htmlType="submit" loading={isLoading}>
          {isLoading ? 'Loading…' : 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Adminlogin;
