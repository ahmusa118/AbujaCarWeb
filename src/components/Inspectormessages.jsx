import React, { useEffect, useState } from 'react';
import { Card, Button, Empty, Carousel } from 'antd';

const InspectorMessages = () => {
  const [messages, setMessages] = useState([]);
  const inspectorData = JSON.parse(localStorage.getItem('inspectordata'));
  const { email: inspectorEmail } = inspectorData || {};
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`https://abujacar.org/api/getinspectormessages/${inspectorEmail}`);
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

    // Clean up the event listener when the component unmounts
  }, [count]);

  const handleclick = async (message, decision) => {

    try {
     
      // Assuming inspectordata is available in the component state
      const { requestno, customeremail } = message;

      const response = await fetch(`https://abujacar.org/api/updatemessage/${decision}/${inspectorEmail}/${requestno}/${customeremail}`, {
        method: 'PUT',
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or trigger a re-fetch of messages
        console.log('Message updated successfully');
      } else {
        // Handle errors, e.g., show an error message
        console.error('Error updating message:', response.statusText);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error updating message:', error);
    }

    // Increment count after handling the click
    setCount(count + 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Messages</h2>
  
      {messages.length > 0 ? 
       <div className='sm:w-[50%]'>
      {messages.map((message, index) => (
        
          <Card key={index} className='mb-[10px]'>
    
            <Carousel >
              
            {message.images.map((img)=>(<img src={`https://abujacar.org/api/indcar/${img}`} alt='img' className=''/> ))}

            </Carousel>
    
   
            <div className='mt-2'>
            <p><strong>Make:</strong> {message.make}</p>
            <p><strong>Mileage:</strong> {message.mileage}</p>
            <p><strong>Customer Email:</strong> {message.customeremail}</p>
            <p><strong>Customer Phone:</strong> {message.customerphone}</p>
            <p><strong>Car ID:</strong> {message.requestno}</p>
            <p><strong>Decision:</strong> {message.decision}</p>
            {/* Add more message details as needed */}
            {message.decision=='Inspection with potential buyer on going'?<><Button onClick={() => handleclick(message, 'Done')}>Done</Button></>:<>
            
            {message.decision=='Sold'?'':<><Button onClick={() => handleclick(message, 'Inspection with potential buyer on going')}>Accept</Button> <Button onClick={() => handleclick(message, 'Reject')}>Reject</Button></>}</>}
           
            </div>
          </Card>
        ))
       }
       </div>
     : (
        <Empty />
      )}
    </div>
  );
};

export default InspectorMessages;
