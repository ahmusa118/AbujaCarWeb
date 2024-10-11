import React, { useState, useEffect } from 'react';
import { Button, Table,Input,DatePicker } from 'antd';
import { useLocation,useNavigate } from 'react-router-dom';
import moment from 'moment'

const Checksocialorder = () => {
  const location = useLocation();
  const Navigate=useNavigate()

  const [orderdata, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [totalItems,setTotalItems]=useState('')
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const { Column } = Table;
  const { RangePicker } = DatePicker;
  // Fetch the currentPage from localStorage or default to 1 if it's not a valid number or less than 1
  const storedPage = localStorage.getItem('currentPage');
  let initialPage = parseInt(storedPage, 10);
  if (isNaN(initialPage) || initialPage < 1) {
    initialPage = 1;
  }

  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let apiUrl = `https://abujacar.org/api/checkordertl?page=${currentPage}&search=${searchQuery}`;
        
        // Add date range parameters if both start and end dates are specified
        if (dateRange.length === 2) {
          const startDate = moment(dateRange[0])
          const endDate = moment(dateRange[1])
         
          apiUrl += `&startDate=${startDate}&endDate=${endDate}`;
        }
  
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        if (response.ok) {
          setOrderData(data);
        } else if (response.status === 404) {
          setOrderData([]);
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
  }, [currentPage, searchQuery, dateRange]);
  

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);
  useEffect(() => {
    const fetchTotalItems = async () => {
      try {
        const response = await fetch('https://abujacar.org/api/totalOrderItems'); // Replace with the actual endpoint to get the total items
        const data = await response.json();

        if (response.ok) {
          setTotalItems(data.totalItems);
        } else {
          console.error(`Error fetching total items: ${data.error}`);
        }
      } catch (error) {
        console.error('Error fetching total items:', error);
      }
    };

    fetchTotalItems();
  }, [])
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearch = (e) => {
setCurrentPage(1)
    setSearchQuery(e.target.value);
  };
  const renderDate = (timestamp) => {
    return moment(timestamp).format('ddd DD MMM YYYY'); // Format the date as "Sat 24 Feb 2024"
  };
console.log(location.state)
  const handleDateRangeChange = (dates) => {
    setCurrentPage(1)
    const convertedDates = dates.map(date => date.toDate()); // Convert moment.js objects to JavaScript Date objects
    setDateRange(convertedDates);
   
  }
  
  const SIZE=6
  const totalPages = Math.ceil(totalItems / SIZE);
  const handleClick=(key)=>{
Navigate('/renderitem',{state:{state:key,adminemail:location.state}})
  }
  return (
    <>
    <Input placeholder="Search" onChange={handleSearch} style={{ marginBottom: '1rem' }} />
    {location.state}<br/>
    <RangePicker
    
  style={{ marginBottom: '1rem' }}
        onChange={handleDateRangeChange}
        format="DD/MM/YYYY"
      />

    <Table 
      dataSource={orderdata} 
      loading={loading} 
      pagination={{ current: currentPage, onChange: handlePageChange, total: totalPages*10 }}
    >
            <Column title="Full Name" dataIndex="fullName" key="fullName" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Make" dataIndex="make" key="requestno" />
            <Column title="Phone" dataIndex="phone" key="phone" />
      <Column title="Receipt No" dataIndex="requestno" key="requestno" />
      <Column title="Nin" dataIndex="nin" key="nin" />
      <Column title="Transaction Type" dataIndex="orderType" key="orderType" />
      <Column title="Acknowledge" dataIndex="acknowledge" key="acknowledge" />
      <Column title="Acknowledged by" dataIndex="editedBy" key="editedBy" />
      <Column title="Date" dataIndex="timestamp" key="timestamp" render={renderDate} />
      <Column 
      title="Check Item" 
    
      key="timestamp" 
      render={(text, record) => (
        <Button onClick={() => handleClick(record)}>Check Details</Button>
      )}
    />
    </Table>
    </>
  );
};

export default Checksocialorder;
