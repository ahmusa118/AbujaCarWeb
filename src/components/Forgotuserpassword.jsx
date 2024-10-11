import React,{useState} from 'react';
import { Form, Input, Button,message } from 'antd'

const Forgotuserpassword = () => {
    const [email,setEmail]=useState('')
    const [code,setCode]=useState(0)
    const [pword,setpword]=useState('')
    const [password,setPassword]=useState('')
 const [ver,setVer]=useState('')
 const [loading, setLoading] = useState(false);
const handleChangePassword=async()=>{

        setLoading(true);
        try {
          const response = await fetch(`https://abujacar.org/api/changeindividualpassword/${email}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
          });
          const data = await response.json();
    
          if (response.ok) {
            message.success(data.ok);
            // Redirect to another page or perform any necessary action
          } else {
            message.error(data.error || 'Failed to change password. Please try again.');
          }
        } catch (error) {
          console.error('Error:', error);
          message.error('An error occurred. Please try again.');
        } finally {
          setLoading(false);
        }
      
}




const handleChange=async()=>{
if(ver==code){
    setpword('changepassword')
}
else{
    message.error('wrong code')
}
}


    const handleFinish=async()=>{
try {
    const data=await fetch(`https://abujacar.org/api/forgotindividualpassword/${email}`,{method:'POST'}).then(res=>res.json()).catch(e=>console.error(e))
    console.log(data)
    if(data.ok){
        message.success(data.ok)
        setCode(data.code)
        setpword('verify')
    }
    else if(data.error){
message.error(data.error)
    }
    else{
        message.error("Internal Server error")
    }
} catch (error) {
    
}
    }
    if(pword==false){
  return (
    <Form onFinish={handleFinish} layout="vertical" className='p-2 sm:w-1/2'>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email!' }]}>
        <Input placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit">
          Login
        </Button>
      </Form.Item>

      
    </Form>
  )
}
else if(pword=='changepassword') {
    return(
        <Form onFinish={handleChangePassword} layout="vertical" className='p-2 sm:w-1/2'>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your new Password!' }]}>
          <Input placeholder="Enter new password" onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Item>
  
        <Form.Item>
          <Button htmlType="submit">
            Submit
          </Button>
        </Form.Item>
  
        
      </Form>
    )
}
else if(pword=='verify'){
    return(
        <Form onFinish={handleChange} layout="vertical" className='p-2 sm:w-1/2'>
        <Form.Item label="Code" name="Code" rules={[{ required: true, message: 'Please enter Verification Code' }]}>
          <Input placeholder="Enter Code" onChange={(e)=>setVer(e.target.value)}/>
        </Form.Item>
  
        <Form.Item>
          <Button htmlType="submit">
            Submit
          </Button>
        </Form.Item>
  
        
      </Form>
    )  
}

}

export default Forgotuserpassword