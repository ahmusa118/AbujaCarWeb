import React,{useState, useRef} from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {styles} from '../styles'
import { Button, Form, Input } from 'antd';
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
const Contact = () => {
  const [form,setForm]=useState({name:'',email:'',message:''})
  const formRef=useRef()
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [message,setMessage]=useState('')
  const [loading,setLoading]=useState(false)
  const handleChange=(e)=>{
const {name,value}=e.target
setForm({...form,[name]:value})

  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    setLoading(true)
//template_5rfbrcn
//service_qxr4zxz
//MnDecPoP0PPy4RKQV
    emailjs.send('service_qxr4zxz','template_5rfbrcn',{
      from_name:name,
      to_name:'Abuja Car',
      from_email:email,
      to_email:'ahmusa118@gmail.com',
      message:message,
    }, 'MnDecPoP0PPy4RKQV').then(()=>{
      setLoading(false), alert('Thank you. I will get back to you ASAP')
      setName('')
      setEmail('')
      setMessage('')
    }).catch((error)=>{
      setLoading(false)
      console.log(error)
      alert('something went wrong')
    })
  }
  const {TextArea}=Input
  return (
    <div
      className={` grid md:grid-cols-2 bg-black p-2 my-1`}
    >
      <div>
      <h2 className='text-[#da9100] text-3xl p-4 font-bold font-roboto'>Contact Us</h2>
      <div className=' pl-4 hidden md:block text-[#faf9f6]'>
      <h1 className='font-roboto text-3xl font-bold'>Hearing from you means the world to us</h1>
      <h3 className='font-roboto text-xl font-thin pr-4'>Your enquiry is important to us! We will respond to your inquiry as soon as possible.</h3>
      <br />
      <hr className='pt-4'/>
      </div>
      </div>
     <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
     className='bg-black text-[#faf9f6] p-4 col-span-1 border'

      >
        
       <Form
    name="wrap"
    labelCol={{ flex: '110px' }}
    labelAlign="left"
    labelWrap
    wrapperCol={{ flex: 1 }}
    colon={false}
    className='w-full'
    onSubmit={handleSubmit}
  >
    <h2 className='text-[#faf9f6] font-roboto font-thin text-lg'>Name</h2>
  <Form.Item   rules={[{ required: true }]} >
  <Input style={{backgroundColor:'#d4d4d4'}} placeholder='Name Here' onChange={(e)=>setName(e.target.value)} value={name}/>
</Form.Item>

<h2 className='text-[#faf9f6] font-roboto font-thin text-lg'>Email</h2>
  <Form.Item  rules={[{ required: true }]} >
  <Input  style={{backgroundColor:'#d4d4d4'}} placeholder='Email Address Here' onChange={(e)=>setEmail(e.target.value)} value={email}/>
</Form.Item>

    <h2 className='text-[#faf9f6] font-roboto font-thin text-lg'>What is your message?</h2>
    <TextArea rows={4} onChange={(e)=>setMessage(e.target.value)} placeholder="Message here"   style={{backgroundColor:'#d4d4d4'}} value={message}/>
    { name.length > 0 && email.length > 0 && message.length > 0 ?
  <button className='text-[#faf9f6] font-thin text-xl mt-4 py-2 px-4 font-roboto border-[#90EE90] border-2 hover:bg-[#faf9f6] hover:text-[#000000] hover:border-[#faf9f6] transition ease-in-out duration-500' onClick={handleSubmit}>
    {loading ? 'Loading...' : 'Submit'}
  </button> :
  <button className='font-karla text-[#faf9f6] hover:bg-[#ffffff] font-thin text-xl mt-4 py-2 px-4 border-[#da9100] border-2 hover:text-[#000000] hover:border-[#faf9f6] transition ease-in-out duration-500'>
    Submit
  </button>
}

  </Form> 

  </motion.div>

    </div>
  )
}

export default SectionWrapper(Contact,'contact')