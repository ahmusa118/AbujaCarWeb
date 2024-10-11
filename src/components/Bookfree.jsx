import React from 'react'
import './ind.css'
import { motion } from 'framer-motion';
import { fadeAnimation} from '../config/motion';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
const Bookfree = () => {
  return (
    <motion.div  variants={slideIn("up", "tween", 0.2, 1)}  className="news-ticker-container text-black shadow-lg bg-black my-1 grid grid-cols-5">
     <h1 className='text-[#faf9f6] col-span-1 z-10 bg-black  h-full w-full '><p className=' px-2 text-[#faf9f6]  md:text-2xl py-14' style={{fontFamily:'louis'}}>We've worked with:</p></h1>
      <div className="news-ticker flex justify-between col-span-4 my-auto">
        <img src='../../assets/abujacarnormal.jpeg' alt='aboutpage2' className='h-[100px] w-[100px] rounded-full mx-2' />
        <img src='../../assets/abjcarrentals.jpeg' alt='aboutpage2' className='h-[100px] w-[100px] rounded-full mx-2' />
        <img src='../../assets/cafebyabjcar.jpeg' alt='aboutpage2' className='h-[100px] w-[100px] rounded-full mx-2' />
        <img src='../../assets/armor.jpg' alt='aboutpage2' className='h-[100px] w-[130px] rounded mx-2' />
      </div>
    </motion.div>
  );
};

export default SectionWrapper(Bookfree,'Bookfree') ;
