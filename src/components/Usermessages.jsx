import React, { useEffect, useState } from 'react';
import { Card, Carousel, Empty } from 'antd';

const UserMessages = () => {
  const [messages, setMessages] = useState([]);
const userEmail=JSON.parse(localStorage.getItem('responseData')).email
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`https://abujacar.org/api/getusermessages/${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data.reverse());
        } else {
          console.error('Error fetching messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // Fetch initial messages
    fetchMessages();
  }, [userEmail]);

  return (
    <div style={{ padding: '20px' }}>
      <h2> Messages</h2>
      {messages.length > 0 ? <div className='grid sm:grid-cols-4  '>{
        messages.map((message, index) => (
          <div key={index} className='mb-2 rounded-lg bg-gray-100 overflow-hidden shadow sm:ml-2'>
            <Carousel>
            {message.images.map((img)=>( <img src={`https://abujacar.org/api/indcar/${img}`} alt={`${img}`} className=' object-cover rounded-t'/>))}
            </Carousel>
            <div className='p-2'>
            <p><strong>Inspector Email:</strong> {message.inspectoremail}</p>
            <p><strong>Car ID:</strong> {message.requestno}</p>
            <p><strong>Make:</strong> {message.make}</p>
            <p><strong>Mileage:</strong> {message.mileage}</p>
            <p><strong>Price:</strong> {message.price}</p>
            <p><strong>Date:</strong>{(new Date(message.timestamp)).toUTCString()}</p>
            {/* Add more message details as needed */}</div>
          </div>
        ))
}</div> : (
        <Empty />
      )}
    </div>
  );
};

export default UserMessages;
