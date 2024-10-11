import React from 'react';
import { Card, Row, Col, Button,Typography, message } from 'antd';
import { ShoppingCartOutlined,CheckCircleOutlined  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const BuyToken = ({ email}) => {
const Navigate=useNavigate()

  const handleSelect = (subscriptionName, price, token) => {
    // Your logic for handling the selected subscription
    if(subscriptionName=='Basic'){
        fetch('https://abujacar.org/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email, // Assuming you have the user's email
                subType: subscriptionName,
                token: token
            })
        })
        .then(response => {
            if (!response.ok) {
                message.alert('Failed to subscribe');
            }
            return response.json();
        })
        .then(data => {
            // Handle success response
        
         alert("Subscribed");
           //setPage('subscribed')
           setTimeout(()=>{Navigate('/sellerLogin')},2000)

        })
        .catch(error => {
            // Handle error
            console.error(error);
        });

    }
    else{
    window.open(`https://abujacar.org/api/charge/${email}/${subscriptionName}/${price}/${token}`)
    }
  };

  return (
    <div className='p-2 bg-[#faf9f6] h-[50%] pt-20'>
    
        <h1 className='text-center text-2xl mb-4  '>Choose your plan</h1>
      <div className='grid sm:grid-cols-3 gap-2'>
      <Card
            title="Basic Subscription"
            className='shadow'
          >
            <p><CheckCircleOutlined /> 2 tokens</p>
            <p><CheckCircleOutlined /> Posting after Standard Subscription</p>
            <p><CheckCircleOutlined /> Price: Free</p>
            <Button
            className='bg-[#008000] w-full'
              icon={<ShoppingCartOutlined />}
              size="small"
              onClick={() => handleSelect("Basic", 0, 2)}
            >
              Select
            </Button>
          </Card>
          

          <Card
            title="Standard Subscription"
            className='shadow'
          >
           
            <p><CheckCircleOutlined /> 4 tokens</p>
            <p><CheckCircleOutlined /> Posting after Premium Subscription</p>
            <p><CheckCircleOutlined /> Price: ₦1000</p>
            <Button
              className='bg-[#40E0D0] w-full'
              icon={<ShoppingCartOutlined />}
              size="small"
              onClick={() => handleSelect("Standard", 1000, 4)}
            >
              Select
            </Button>
          </Card>
          <Card
            title="Premium Subscription"
          className='shadow'
          >
            <p><CheckCircleOutlined /> 8 tokens</p>
            <p><CheckCircleOutlined /> Priority Posting</p>
            <p><CheckCircleOutlined /> Price: ₦4000</p>
            <Button
             className='bg-[#ff0000] w-full'
              icon={<ShoppingCartOutlined />}
              size="small"
              onClick={() => handleSelect("Premium", 4000, 8)}
            >
              Select
            </Button>
          </Card>
      

          
   
      </div>
    </div>
  );
};

export default BuyToken;
