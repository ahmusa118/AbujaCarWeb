
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Carousel, Button, Select, Modal,message, Input,Form } from 'antd';


import './Uploadcar.css'; // Import your CSS file for styling

const { Option } = Select;

const Uploadsocialcar = () => {

  const [category, setCategory] = useState('');
  const [mileage, setMileage] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');
 const [year,setYear]=useState('')
 const [color,setColor]=useState('')
  const [make, setMake] = useState('');
const [vin,setVin]=useState('')
  const [selectedInspector, setSelectedInspector] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [detailModal,setDetailModal]=useState(false)
  const [modalText, setModalText] = useState('');
const [loading,setLoading]=useState(false)
const [charge,setCharge]=useState('')
const [orderType,setOrderType]=useState('')
const [order,setOrder]=useState([{
    name:'Park Inside Showroom', charge:1500
},{name:'Park Outside',charge:1000},{
    name:'Social Media Upload',charge:10
}])
  const location = useLocation();







  const handleUpload = async () => {

//email:location.state.email,phone:location.state.phone,fullName:location.state.fullName,location:location.state.state,state:location.state.state,address:location.state.address

if(!location.state.phone){
  setDetailModal(true)
}
else{
    try {
      setLoading(true)
      if (!make || !category || !mileage || !price ||!year ||!vin ||!color ||!orderType ||!charge ) {
        message.error('Please fill in all fields');
        return;
      }
      
      const randomNumber = Math.floor(Math.random() * 1000) + 1;

      // Generate three random letters
      const randomLetters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                            String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                            String.fromCharCode(65 + Math.floor(Math.random() * 26));
      
      // Combine the random number and random letters to form the receipt number
      const receiptNo = randomLetters + randomNumber.toString();
  if(charge==10){
const dataToSend={ email:location.state.email,phone:location.state.phone,fullName:location.state.fullName,location:location.state.state,state:location.state.state,address:location.state.address,price:price,make:make,category:category,mileage:mileage,year:year,vin:vin,color:color,orderType:orderType,receiptNo:receiptNo,nin:location.state.nin}
const data=await fetch('https://abujacar.org/api/charge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  })

  .then(response => response.json()).catch(e=>console.log(e))
if(data.success){
    message.success(data.success)
}else {
    message.error(data.error)
}
  }
 
  else{
   window.open(`https://abujacar.org/api/chg/${location.state.email}/${location.state.phone}/${location.state.fullName}/${location.state.state}/${location.state.state}/${location.state.address}/${price}/${make}/${category}/${mileage}/${year}/${vin}/${color}/${orderType}/${charge}/${location.state.nin}`)
  }
 

    } catch (error) {
      console.error('Error uploading car:', error);
    }
    finally{setLoading(false)}
  }
  }

  const handleModalOk = () => {
    // Clear modal text and hide modal
    setModalText('');
    setSuccessModalVisible(false);
  };
  const handleModalOk2 = async(values) => {
    // Clear modal text and hide modal 

    try {
      if (!make || !category || !mileage || !price ||!year ||!vin ||!color ||!orderType ||!charge ) {
        message.error('Please fill in all fields');
        return;
      }
      
      const randomNumber = Math.floor(Math.random() * 1000) + 1;

      // Generate three random letters
      const randomLetters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                            String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                            String.fromCharCode(65 + Math.floor(Math.random() * 26));
      
      // Combine the random number and random letters to form the receipt number
      const receiptNo = randomLetters + randomNumber.toString();
  if(charge==10){
const dataToSend={ email:location.state.email,phone:values.phone,fullName:values.fullname,location:values.location,state:values.state,address:values.address,price:price,make:make,category:category,mileage:mileage,year:year,vin:vin,color:color,orderType:orderType,receiptNo:receiptNo,nin:values.nin}
setLoading(true)
const data=await fetch('https://abujacar.org/api/charge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  })

  .then(response => response.json()).catch(e=>console.log(e))

if(data.success){



const postdetails={ email:location.state.email,phone:values.phone,location:values.location,state:values.state,address:values.address,nin:values.nin}
 const senddetails =await fetch('https://abujacar.org/api/postsocialgoogledetails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postdetails)
  })
  const res=await senddetails.json()
  console.log(res)
    message.success(data.success)





}else {
    message.error(data.error)
}
  }
 
  else{

    if(location.state.method=='google'){
    const postdetails = {
      email: location.state.email,
      phone: values.phone,
      location: values.location,
      state: values.state,
      address: values.address,
      nin: values.nin
    };
    
    setLoading(true);
    
    try {
      const response = await fetch('https://abujacar.org/api/postsocialgoogledetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postdetails)
      });
    
      if (!response.ok) {
        throw new Error('Failed to post social google details');
      }
    
      const res = await response.json();
    
      console.log(res);
    
      // Open the new window after posting the details
      window.open(`https://abujacar.org/api/chg/${location.state.email}/${values.phone}/${location.state.fullName}/${values.state}/${values.location}/${values.address}/${price}/${make}/${category}/${mileage}/${year}/${vin}/${color}/${orderType}/${charge}/${values.nin}`);
    } catch (error) {
      console.error('Error posting social google details:', error);
    } finally {
      setLoading(false);
    }
  }else{

    const postdetails = {
      email: location.state.email,
      fullName:values.fullname,
      phone: values.phone,
      location: values.location,
      state: values.state,
      address: values.address,
      nin: values.nin
    };

    setLoading(true);
    
    try {
      const response = await fetch('https://abujacar.org/api/postsocialemaildetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postdetails)
      });
    
      if (!response.ok) {
        throw new Error('Failed to post social email details');
      }
    
      const res = await response.json();
    
      console.log(res);
    
      // Open the new window after posting the details
      window.open(`https://abujacar.org/api/chg/${location.state.email}/${values.phone}/${location.state.fullName?location.state.fullName:values.fullname}/${values.state}/${values.location}/${values.address}/${price}/${make}/${category}/${mileage}/${year}/${vin}/${color}/${orderType}/${charge}/${values.nin}`);
    } catch (error) {
      console.error('Error posting social google details:', error);
    } finally {
      setLoading(false);
    }
  }

   
  }
 

    } catch (error) {
      console.error('Error uploading car:', error);
    }


    finally{
      setDetailModal(false);
      setLoading(false)}

  }
console.log(location.state)

  return (
    <div className=''>
     

      <div className='upload-car-form'>
        <div className=''>

          <label>Make: </label>
          <input type='text' value={make} onChange={(e) => setMake(e.target.value)} />

          <label>Category: </label>
          <Select
        style={{ width: '100%' }}
        placeholder='Select Category'
        onChange={(value) => {
          setCategory(value)
        }}
      >
      <Option value='Sedan'>
          Sedan
      </Option>
      <Option value='SUV'>
          SUV
      </Option>
      </Select>

          <label>Mileage (Miles): </label>
          <input type='number' value={mileage} onChange={(e) => setMileage(e.target.value)} />

          <label>Price (Naira): </label>
          <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
          <label>Year: </label>
          <input type='number' value={year} onChange={(e) => setYear(e.target.value)} />
         

      <label>VIN: </label>
          <input  value={vin} onChange={(e) => setVin(e.target.value)} />

          <label>Color: </label>
          <input  value={color} onChange={(e) => setColor(e.target.value)} />

          <label>Select service: </label>
          <Select
        style={{ width: '100%' }}
        placeholder='Select service type'
        onChange={(value,option) => {
          setOrderType(value)
          setCharge(option.charge)
        }}
      >
    {order.map((tex)=>(<Option value={tex.name} charge={tex.charge}>
        {tex.name} - {tex.charge==10?'Free':`N${tex.charge}`}
    </Option>))}
      </Select>

      <Button
  htmlType="submit"
  className='mt-2'
  loading={loading}
  onClick={handleUpload}
  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>
  Submit
</Button>

        </div>
      </div>

      <Modal
        title='Upload Success'
        open={successModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        {modalText}
      </Modal>



      <Modal
        title='Input Details'
        open={detailModal}
footer={false}
        onCancel={()=>setDetailModal(false)}
      >
  <Form
        name="signup"
      onFinish={handleModalOk2}
        initialValues={{
          state: undefined,
        }}
        layout="vertical"
      >
        <Form.Item
          name="fullname"
          label="Full Name"
          rules={[{ required: true, message: 'Please input your full name!' }]}
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
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input />
        </Form.Item>
            <Form.Item
          name="state"
          label="State"
          rules={[{ required: true, message: 'Please select your state!' }]}
        >
        <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Car location"
          rules={[{ required: true, message: 'Please enter your car location' }]}
        >
        <Input />
        </Form.Item>

      

        <Form.Item
          name="nin"
          label="Nin"
          rules={[{ required: true, message: 'Please enter your National Identification Number (NIN)' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item>
        <Button htmlType="submit" loading={loading} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
        </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Uploadsocialcar;

