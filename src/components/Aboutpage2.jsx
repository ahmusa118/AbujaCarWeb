import React from 'react';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion'
import { slideIn,zoomIn } from "../utils/motion";

import Wordslider from './Wordslider';
const Aboutpage2 = () => {
  return (
    <motion.main  variants={slideIn("up", "tween", 0.2, 1)} className='bg-[#d4d4d4] pl-4 pb-8 shadow-xl'>
         
       <Wordslider />
     

    </motion.main>
  );
};

export default SectionWrapper(Aboutpage2,'aboutpage2');
