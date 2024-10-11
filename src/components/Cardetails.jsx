import React from 'react'
import { useLocation } from 'react-router-dom'
import { Carousel,Button,message } from 'antd'
const Cardetails = () => {
    const Location=useLocation()

    const {_id,address,category,email,fullName,images,inspectedBy,inspectoremail,indpectorid,location,make,mileage,phone,newPrice,requestno}=Location.state.key
const customeremail=(Location.state.details.email)
const customerfullName=Location.state.details.fullName
const place=Location.state.details.state
const customerphone=Location.state.details.phone

const handleclick=async()=>{



    const details={
        customerfullName:customerfullName,
    customeremail:customeremail,
    customerphone:customerphone,
    location:place,
    inspectoremail:inspectoremail,
    requestno:requestno,
    inspectedBy:inspectedBy,
    images:images,
    newPrice:newPrice,
    make:make,
    mileage:mileage,
    price:newPrice
    
 }
    try {
        const response = await fetch(`https://abujacar.org/api/carrequest/${inspectoremail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(details),
        });
  
        const data = await response.json();
        console.log(data)
  if(data.ok){
    message.success('Request sent')
  }else {
    message.error('error sending request')
  }
}
        catch(e){
          console.log(e)
            message.error('Internal server error')
        } 
}
  return (
    <div className='bg-[#faf9f6] h-full mb-2'>
      <div className='pt-2 '></div>
      <div className='bg-gray-200 m-2 rounded shadow-lg sm:w-[35%] sm:m-auto   '>
        <Carousel className=''> {images.map((img)=>(<img src={`https://abujacar.org/api/indcar/${img}`} alt='' className='h-90 w-full rounded-t' key={img}/>))
  }</Carousel>
   <div className='flex flex-col p-2'>
  <p><strong>Make: </strong> {make.toUpperCase()}</p>
  <p><strong>Price: </strong> {newPrice}</p>
  <p><strong>Location: </strong> {location}</p>
  <p><strong>Mileage:</strong> {mileage}</p>
  <p><strong>Category:</strong> <p className='uppercase inline-block'>{category}</p></p>
  <Button onClick={handleclick}>Inquire</Button>
  </div>
  </div>
  </div>
  )
}

export default Cardetails

{/*
  customerfullName:{type:String},
        customeremail:{type:String},
        customerphone:{type:String},
        location:{type:String},
        inspectoremail:{type:String},
        requestno:{type:String},
        decision:{type:String}
*/}