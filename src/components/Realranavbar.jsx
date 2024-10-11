import React,{useState} from 'react'
import { Typography,Button } from 'antd';

import SearchIcon from '@ant-design/icons/SearchOutlined';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text} = Typography;
import { close, menu } from '../../assets';
const Realranavbar = ({navLinks,username,messnav, showLoginModal,click,showSignupModal, logout, showModal,toggle}) => {

    const [active, setActive] = useState('');


  
const firstletter=(word)=>{
const x=word.replace(word[0],word[0].toUpperCase())
return x
      }
  return (
    <React.Fragment >

<div className={` flex justify-between items-center  z-1000 text-white  py-2 border-b w-screen`}>
    <div className='flex items-center'>
  <img src='../../assets/abujacarnormal.jpeg' alt='img' className='h-20  rounded-full' />
 <h1 className='font-roboto text-xl ml-2'>Abuja<span className='text-[#da9100]'>Car</span></h1> 
 <SearchIcon onClick={showModal} className='ml-2 flex  mt-1' />
  </div>
  
  

  {username ? (
        // Display username and logout button if local storage is not null
        <>
      
        <div className='hidden sm:flex '>
    
    
            <div className=' bg-[#da9100] mr-2 rounded-md p-2 shadow-md flex items-center'>
  <UserOutlined className='text-white' />
  <p className='pl-2 text-white text-sm '>{firstletter(username)}</p>
</div>
            <Button onClick={messnav} className='text-white mr-2'>Messages</Button>
          <Button className='' onClick={logout}><p className='text-white'>Logout</p></Button>
          <div className='mt-1 mr-2'>
    
    {navLinks.map((nav, index) => (
   <Link
   key={index}
   to={`/${nav.id}`}
   className=' font-roboto pl-2  cursor-pointer hover:text-[#da9100] transition ease-in duration-300 '
 >
        {nav.title}
      </Link>
    ))}
  </div>
        </div>
     
        <img src={toggle?close:menu} alt='menu' onClick={click} className='cursor-pointer mr-2 sm:hidden block'/>

        </>
      ) : (
        // Display login and signup buttons if local storage is null
        <><div className='sm:flex hidden '>
           
           <Button className='mr-2' onClick={showLoginModal}><p className='text-white'>Login</p></Button>
           <Button onClick={showSignupModal}><p className='text-white'>Signup</p></Button>
           <div className='mt-1 mr-2'>
    
    {navLinks.map((nav, index) => (
   <Link
   key={index}
   to={`/${nav.id}`}
   className=' font-roboto pl-2  cursor-pointer hover:text-[#da9100] transition ease-in duration-300 '
 >
        {nav.title}
      </Link>
    ))}
  </div>
        </div>
        <img src={toggle?close:menu} alt='menu' onClick={click} className='cursor-pointer mr-2 sm:hidden block'/>
        
        </>
      )}
      
    

</div>

<div className='block sm:hidden'>
{toggle &&(<div className=' items-start flex flex-col p-2 pl-4 font-roboto'>



{username?<>
      {toggle &&(<div className='w-full  '>
      <div className='justify-center bg-[#da9100] mr-2 rounded-md p-2 shadow-md flex items-center mb-2 '>
  <UserOutlined className='text-white ' />
  <p className='pl-2 text-white text-sm  '>{firstletter(username)}</p>
</div>
      <Button  onClick={logout} className='w-full text-white'>
      Logout
    </Button>
    <div className='mt-4 '>
    
    {navLinks.map((nav, index) => (
   <Link
   key={index}
   to={`/${nav.id}`}
   className='shadow rounded font-roboto p-2 w-full justify-center flex  text-white  border cursor-pointer hover:text-[#da9100] transition ease-in duration-300 '
 >
        {nav.title}
      </Link>
    ))}
  </div>
    </div>)}
      </>:<>
      {toggle &&(<div className='w-full '>
    
    <Button onClick={showLoginModal} className='w-full mb-2 text-white'>
    Login
  </Button>
      <Button  onClick={showSignupModal} className='w-full text-white'>
      Signup
    </Button>
    <div >
    
    {navLinks.map((nav, index) => (
      <Button className='w-full text-white mt-2'>
   <Link
   key={index}
   to={`/${nav.id}`}
  className='pb-2'
 >
        {nav.title}
      </Link>
      </Button>
    ))}
  </div>
    </div>)}
      </>}
</div>)}

</div>
    </React.Fragment>
  )
}

export default Realranavbar