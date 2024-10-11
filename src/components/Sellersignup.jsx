import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useLocation,useNavigate } from 'react-router-dom';

const { Option } = Select;

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const location=useLocation()
  const queryParams = new URLSearchParams(location.search);
  const em = queryParams.get('email');
  const navigate=useNavigate()
  const onFinish = (values) => {
    setLoading(true);
    
    // Here you can send a request to your backend to post the form data
    fetch('https://abujacar.org/api/postuserdetails', {
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
          alert('Sign up successful!');
          navigate('/datapage',{state:{email:values.email}})

if(em){
 fetch(`https://abujacar.org/api/addtoken/${em}`, {method: 'POST'}).then((res)=>res.json()).then(data=>console.log(data)).catch(err=>console.log(err))


}else{null}




        } else {
          alert('Sign up failed. Please try again.');
        }
      })
      .catch(error => {
        // handle error
        setLoading(false);
        alert('An error occurred. Please try again.');
      });

 
  };
const hc=()=>{
  if(em){
    message.success('exists')
  }
  else{
    message.error('no')
  }
}
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
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
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
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: 'Please input your city!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="state"
          label="State"
          rules={[{ required: true, message: 'Please select your state!' }]}
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
