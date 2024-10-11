import React from 'react'
import { useLocation } from 'react-router-dom'

import { Button,message } from 'antd'

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

const Renderitem = () => {
    const location=useLocation()
    const acknowledge = async (key, email) => {

        const response = await fetch(`https://abujacar.org/api/acknowledge/${key}/${email}`, { method: 'PUT' });
    
     
      const data=await response.json()
 if(data.success){
message.success(data.success)
 }else {
  message.error(data.error)
 }
    
      
      }
    
    
return (
<div className='flex items-center justify-center  bg-[#faf9f6] h-screen'>
<Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >

    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title={`${location.state.state.fullName}`}
      description={<>
     <p className='flex'><p className='text-black mr-2 uppercase'>Order Type:</p> {location.state.state.orderType}</p>
     <p className='flex'><p className='text-black mr-2 uppercase'>Email:</p> {location.state.state.email}</p>
     <p className='flex'><p className='text-black mr-2 uppercase'>VIN:</p> {location.state.state.vin}</p>
     <p className='flex'><p className='text-black mr-2 uppercase'>Receipt No:</p> {location.state.state.requestno}</p>
     <p className='flex'><p className='text-black mr-2 uppercase'>Make:</p> {location.state.state.make}</p>
     <p className='flex'><p className='text-black mr-2 uppercase'>Date:</p> {new Date(location.state.state.timestamp).toDateString()}</p>
     <p className='flex'><p className='text-black mr-2 uppercase'>Car Year:</p> {location.state.state.year}</p>
     <p className='flex'><p className='text-black mr-2 uppercase'>Amount In Words:</p> {location.state.state.amountInWords}</p>
     <p className='flex'><p className='text-black mr-2 uppercase'>Model:</p> {location.state.state.model}</p>
     <p className='flex'><p className='text-black mr-2 uppercase'>Currency:</p> {location.state.state.currencyType}</p>
  <Button onClick={()=>acknowledge(location.state.state._id,location.state.adminemail)}>Acknowledge</Button>
      </>}
 
    />
    
  </Card>
  </div>
  )
}
export default Renderitem;