import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Empty, Carousel, Input, Spin, Upload, Button as AntButton } from 'antd';

const { TextArea } = Input;

const Inspectordb = () => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Local state to store report and images for each car
  const [carReports, setCarReports] = useState({});
  const [carImages, setCarImages] = useState({});

  const handleButtonClick = async (requestno, email) => {
    try {
      const formData = new FormData();
      formData.append('report', carReports[requestno]);
      formData.append('requestno', requestno);
      formData.append('email', email);
      // Add image files to formData for the specific car
      const imageFiles = carImages[requestno] || [];
      imageFiles.forEach((image) => {
        formData.append('images', image.originFileObj);
      });

      // Handle file upload logic here

      fetch('https://abujacar.org/api/carinspection', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.text())
        .then((text) => {
          console.log(text);
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    } catch (error) {
      console.error('Error uploading car:', error);
    }
    setCount(count + 1);
  };

  const { email, idno } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://abujacar.org/api/inspectcar/${email}/${idno}`, { method: 'POST' });
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
  }, [count, email, idno]);

  // Function to update report in local state
  const handleReportChange = (requestno, value) => {
    setCarReports((prevReports) => ({
      ...prevReports,
      [requestno]: value,
    }));
  };

  // Function to update images in local state
  const handleFileChange = (requestno, fileList) => {
    setCarImages((prevImages) => ({
      ...prevImages,
      [requestno]: fileList,
    }));
  };

  // Function to handle search submission
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
      <div className='flex  items-center mb-4'>
        <p onClick={() => navigate('/inspectormessages')} className='cursor-pointer text-blue-500'>
          Messages
        </p>
        <div className='pl-4'>
  <Input
    placeholder='Search by make, category or car id'
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className='w-64 mr-2'
  />
  <AntButton onClick={handleSearchSubmit}>Search</AntButton>
</div>
      </div>
      {loading ? (
        <div className='flex items-center justify-center h-64'>
          <Spin />
        </div>
      ) : carData.length > 0 ? (
        carData.map((car) => (
          <div key={car._id} className='my-4 p-4 border border-gray-200 rounded-lg shadow'>
            <p className='flex font-semibold'>
              Make: <p className='text-xl font-semibold pl-2'>{car.make}</p>
            </p>
            <p className='flex font-semibold'>
              Seller Email: <p className='text-gray-600 pl-2'>{car.email}</p>
            </p>
            <p className='flex font-semibold'>
              Category: <p className='text-gray-600 pl-2'>{car.category}</p>
            </p>
            <p className='flex font-semibold'>
              Seller Address: <p className='text-gray-600 pl-2'>{car.address}</p>
            </p>
            <p className='flex font-semibold'>
              Car Id: <p className='text-gray-600 pl-2'>{car.requestno}</p>
            </p>
            <Carousel className=' w-full mb-4'>
              {car.images.map((img) => (
                <img key={img} src={`https://abujacar.org/api/indcar/${img}`} alt='Car' className='sm:h-30 object-cover ' />
              ))}
            </Carousel>
            <div className='w-full mt-4'>
              <TextArea rows={4} onChange={(e) => handleReportChange(car.requestno, e.target.value)} className='w-full mb-4' />
              <Upload
                beforeUpload={(file) => false}
                onChange={(info) => {
                  const fileList = [...info.fileList];
                  handleFileChange(car.requestno, fileList);
                }}
                showUploadList={false}
                multiple={true}
              >
                <AntButton>Upload Report</AntButton>
              </Upload>
            </div>
            <AntButton className='my-4' onClick={() => handleButtonClick(car.requestno, car.email)}>
              Submit
            </AntButton>
          </div>
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Inspectordb;
