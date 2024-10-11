import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';

const { Option } = Select;

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log('Received values:', values);
    // Here you can send a request to your backend to post the form data
    fetch('https://abujacar.org/api/individual', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        // handle response
        setLoading(false);
        if (response.ok) {
          message.success('Check email for verification code');
        } else {
          message.error('Sign up failed. Please try again.');
        }
      })
      
      .catch(error => {
        // handle error
        setLoading(false);
        message.error('An error occurred. Please try again.');
      });
  };

  return (
    <div className='p-6'>
      <Form
        name="signup"
        onFinish={onFinish}
        initialValues={{
          state: undefined,
        }}
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item
          name="phone"
          label="Phone (optional)"
     
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address (optional)"
          
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="city"
          label="City (optional)"
        
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="state"
          label="State (optional)"
          
        >
          <Select>
            {nigerianStates.map((state, index) => (
              <Option key={index} value={state}>
                {state}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" loading={loading} disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const nigerianStates = [
  "Federal Capital Territory","Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

export default SignUpForm;
