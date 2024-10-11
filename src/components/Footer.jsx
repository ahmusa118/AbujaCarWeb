import React from 'react'
import ItemsContainer from './ItemsContainer'
import Socialicons from './Socialicons'
import { slideIn } from '../utils/motion'
import { Icons } from './Menus'
import { SectionWrapper } from '../hoc'
import { motion } from 'framer-motion'
const Footer = () => {
  return (
    <motion.div variants={slideIn("up", "tween", 0.2, 1)}  className='bg-black overflow-hidden'>
    <div className='grid sm:grid-cols-3 '>
<div className='px-2 pt-2'>
  <div className='flex flex-row '>
  <img src='../../assets/abujacarnormal.jpeg' alt='abjcar' className='w-[100px] h-[100px]'/>
  <h1 className='py-10 px-2 font-semibold text-3xl font-roboto'>Abuja<span className='text-[#da9100]'>Car</span></h1>
  </div>
  <h3 className='font-thin  pl-2 text-justify text-white ' style={{fontFamily:'louis'}}>We see the new Africa in a new light that reflects her diversity. Blessed with enormous resources able to address the growing challenges in an expanding landscape and growing population.</h3>
</div>


<div className='pt-2 md:mt-12 pl-2 md:mx-auto'>
  <h1 className='font-roboto text-xl font-semibold pl-2 pb-2'>Contacts</h1>
  <div className='font-roboto font-thin pl-2'>
<div className='pb-4'><h1 className='font-semibold'>Phone</h1>
<h3>+2349134762890</h3>
</div>
<div className='pb-4'>
<h1 className='font-semibold'>Email</h1>
<h3>services.abujacar@gmail.com</h3>
</div>
<div className='pb-2'>
  <h1 className='font-semibold'>Address</h1>
  <h3>Plot 53 Bala Kona Street Kado District, Abuja Nigeria</h3>
</div>
  </div>
 </div>
<div className='pt-2 md:mt-12 pl-4 md:mx-auto'>
  <h1 className='font-roboto text-xl font-semibold  pb-2'>Social</h1>
  <Socialicons Icons={Icons} /></div>
    </div>
    <hr className='mx-1 my-4'/>
    <div className='font-thin font-roboto pl-4 mb-8 mt-6'>
    <span >©️ 2024 AbujaCar. All rights reserved.</span>
    <span> Terms . Privacy Policy</span>
    </div>
    </motion.div>
  )
}

export default SectionWrapper(Footer,'footer')