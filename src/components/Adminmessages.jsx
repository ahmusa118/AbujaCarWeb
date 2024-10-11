import React, { useState, useEffect } from 'react';
import { Card, Typography, Empty, Carousel, Button } from 'antd';

const { Text } = Typography;

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
const [count,setCount]=useState(0)
  useEffect(() => {
    const fetchAdminMessages = async () => {
      try {
        const response = await fetch('https://abujacar.org/api/getadminmessages');
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Error fetching admin messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching admin messages:', error);
      }
    };

    // Fetch admin messages on component mount
    fetchAdminMessages();
  }, [count]); // The empty dependency array ensures that the effect runs only once on mount
  const handleclick = async (key) => {
    try {
      const response = await fetch(`https://abujacar.org/api/sold/${key.requestno}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // You might need to include authentication headers or tokens if required
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result); // Log the response or handle it as needed
      } else {
        console.error('Failed to mark car as sold:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setCount(count+1)
  };
  console.log(messages)
  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Messages</h2>
      {messages.length > 0 ? <div className='sm:w-[50%]'>
        {messages.map((message, index) => (
          <Card key={index} style={{ marginBottom: '10px' }}>
            <Carousel>
            {message.images.map((img)=>(
                <img src={`https://abujacar.org/api/indcar/${img}`} alt={`${img}`} />
            ))}
            </Carousel>
            <p>
              <strong>Inspector Email:</strong> {message.inspectoremail}
            </p>
            <p>
              <strong>Decision:</strong> {message.decision}
            </p>
            {/* Add more message details as needed */}
            <p>
              <strong>Make:</strong> {message.make}
            </p>

            <p>
              <strong>Car Id:</strong> {message.requestno}
            </p>
            <p>
              <strong>Buyer email:</strong> {message.customeremail}
            </p>
            <p>
              <strong>Buyer phone:</strong> {message.customerphone}
            </p>
            <Button onClick={()=>handleclick(message)}>Sold</Button>
          </Card>
        ))
             }</div> : (
        <Empty description="No messages" />
      )}
    </div>
  );
};

export default AdminMessages;
