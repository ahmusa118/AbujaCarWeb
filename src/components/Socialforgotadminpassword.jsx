import React,{useState} from 'react'
import { Input,Button, message } from 'antd'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from './firebase/firebaseConfig'
const Socialforgotadminpassword = () => {
    const [email,setEmail]=useState('')
    const resetpassword=async()=>{
        await sendPasswordResetEmail(auth,email).then(()=>message.success('Password reset email sent. Check spam if not in inbox')).catch(e=>message.error('Something wrong happened'))
    }
  return (
    <div className='m-2'>
<Input placeholder='Enter your Email address' onChange={(e)=>setEmail(e.target.value)}>
</Input>
<Button onClick={resetpassword} className='mt-2'>Submit</Button>
    </div>
  )
}

export default Socialforgotadminpassword