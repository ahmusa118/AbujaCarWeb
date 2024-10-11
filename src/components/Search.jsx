import React, { useState } from 'react';
import { Modal,Input,Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
const Search = ({ visible, onSearch, onCancel,setTrue,setFalse }) => {

  const [make, setMake] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [mileage, setMileage] = useState(['', '']);
  const [price, setPrice] = useState(['', '']);

const filters = {
  make,
  location,
  category,
  mileage,
  price,
};

// Remove empty or null fields from the filters object

const handlesearch=()=>{
  onSearch(filters)
}


  return (
    <Modal
    title='Search Cars'
    visible={visible}
    onOk={handlesearch}
    onCancel={onCancel}
    destroyOnClose
  >
      <div><label>Make:</label>
      <Input type="text" value={make} onChange={(e) => setMake(e.target.value)} /></div>

      <div><label>Location:</label>
      <Input type="text" value={location} onChange={(e) => setLocation(e.target.value)} /></div>

      <div><label>Category:</label>
      <Input type="text" value={category} onChange={(e) => setCategory(e.target.value)} /></div>

      <div><label>Mileage (from):</label>
      <Input type="number" value={mileage[0]} onChange={(e) => setMileage([e.target.value, mileage[1]])} /></div>
     
      <div><label>Mileage (to):</label>
      <Input type="number" value={mileage[1]} onChange={(e) => setMileage([mileage[0], e.target.value])} /></div>

      <div><label>Price (from):</label>
      <Input type="number" value={price[0]} onChange={(e) => setPrice([e.target.value, price[1]])} /></div>
      
      <div><label>Price (to):</label>
      <Input type="number" value={price[1]} onChange={(e) => setPrice([price[0], e.target.value])} /></div>

    
   </Modal>
  );

}
export default Search;
