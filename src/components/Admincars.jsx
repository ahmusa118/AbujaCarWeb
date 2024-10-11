import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Empty, Carousel, Input, Upload, Button as AntButton, Spin } from 'antd';

import emailjs from '@emailjs/browser'
const { TextArea } = Input;

const Admincars = () => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [count, setCount] = useState(0);
const [newPrice,setNewPrice]=useState(0)
const [searchQuery, setSearchQuery] = useState('');
const Navigate=useNavigate()
  // Local state to store report and images for each car
 

  const { email, idno } = location.state;
  const { TextArea } = Input;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://abujacar.org/api/getcars`);
        const data = await response.json();

        if (response.ok) {
          setCarData(data);
        } else if (response.status === 404) {
          setCarData([]);
        } else {
          console.error(`Error fetching data: ${data.error}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [count]);

  const handleButtonClick = async (requestno, email, carId, decision) => {
    try {
      // Fetch car record by ID
      const carResponse = await fetch(`https://abujacar.org/api/getcar/${carId}`);
      const carRecord = await carResponse.json();
      
      // Update the price if it's provided
 
      
      

      // Perform actions based on your business logic
      // For example, change status to 'Accepted'
      carRecord.status = decision;

      // You can similarly handle 'Rejected' status here

      // Update the car record
      const updateResponse = await fetch(`https://abujacar.org/api/updatecar/${carId}/${newPrice}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carRecord),
      });

      if (updateResponse.ok) {
        console.log(`Car with ID ${carId} has been ${decision}.`);
        // You may choose to refetch the data or update the local state
        setCount((prevCount) => prevCount + 1);
        setNewPrice(0); // Reset newPrice after successful update



        emailjs.send('service_qxr4zxz','template_susux5c',{
            from_name:'Abuja Car',
            to_name:email,
            from_email:'ahmusa118@gmail.com',
            to_email:email,
            message:`your car with ${requestno} has been ${decision}`,
          }, 'MnDecPoP0PPy4RKQV')


      } else {
        console.error(`Error updating car with ID ${carId}: ${updateResponse.statusText}`);
      }
    } catch (error) {
      console.error('Error handling button click:', error);
    }
  }
  // Function to update images in local state
  const handleSearchSubmit = () => {
    const filteredData = carData.filter((car) => {
      return (
        car.requestno.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setCarData(filteredData);
  };
  return (
    <div className='m-2 sm:w-1/2'>

<div className='pl-4 mb-2 flex mt-2'>
<p className='cursor-pointer hover:text-[#0000ff] pr-2' onClick={()=>Navigate('/adminmessages')}>Messages</p>
  <Input
    placeholder='Search by category, make or car ID'
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className='w-64 mr-2'
  />
  <AntButton onClick={handleSearchSubmit}>Search</AntButton>
</div>
      {loading ? (
       <Spin />
      ) : carData.length > 0 ? (
        carData.map((car) => (
          <div key={car._id} className=' my-4 p-4 border border-gray-200 rounded-lg shadow'>
  
             
            <p className='flex'><p className='pr-2 font-semibold'>Make: </p>{car.make}</p>
            <p className='flex'><p className='pr-2 font-semibold'>Price:</p> {car.price}</p>
            <p className='flex'><p className='pr-2 font-semibold'>Seller email:</p> {car.email}</p>
            <p className='flex'><p className='pr-2 font-semibold'>Seller Phone:</p> {car.phone} </p>
            <p className='flex'><p className='pr-2 font-semibold'>Car Id:</p> {car.requestno}</p>
            <p className='flex'><p className='pr-2 font-semibold'>Category:</p> {car.category}</p>
            <p className='flex'><p className='pr-2 font-semibold'>Seller Address:</p> {car.address}</p>
            <p className='flex'><p className='pr-2 font-semibold'>Status:</p> {car.state}</p>
            <p className='flex'><p className='pr-2 font-semibold'>Report:</p> {car.report}</p>
            <Carousel className='w-full mb-4'>
              {car.images.map((img) => (
                <img key={img} src={`https://abujacar.org/api/indcar/${img}`} className='sm:h-30 object-cover' alt='img' />
              ))}
            </Carousel>

            <p>report data:</p>
            
                <a href={`https://abujacar.org/api/indreport/${car.reportImage}`} target='_blank' rel='noopener noreferrer'>
                  Report Document
                </a>
         
          <div className='w-[50%] '>
               <Input
                placeholder='Enter new price'
                onChange={(e) => setNewPrice(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <AntButton 
                className='my-2'
                style={{ background: '#00ff00' }}
                onClick={() => handleButtonClick(car.requestno, car.email, car._id,'Accepted')}
              >
                Accept
              </AntButton >
              <AntButton 
                className='my-2 ml-2'
                style={{ background: '#ff0000' }}
                onClick={() => handleButtonClick(car.requestno, car.email, car._id,'Rejected')}
              >
                Reject
              </AntButton >
            </div>
          
          </div>
      
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Admincars;
