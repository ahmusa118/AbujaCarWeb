import React from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { fadeIn,textVariant } from '../utils/motion';
import {headContainerAnimation, headTextAnimation,slideAnimation} from '../config/motion'
import { SectionWrapper } from '../hoc';
import {render1,render2,render1b,render2b,render3,render4,render6} from '../../assets'
import { Carousel } from 'antd';
import './ind.css'
const About = () => {
  const images=[render1,render2,render1b,render2b,render3,render4,render6]
  return (
    <AnimatePresence>
      <section className='bg-black pb-4'>
    <Carousel autoplay>
      {images.map((img)=>(<img src={img} alt='' className='object-cover' />))}
    </Carousel>

    <motion.div {...headContainerAnimation} className=''><h1 className='text-3xl text-[#da9100] font-bold font-roboto mt-2 pl-4 mb-4'>AbujaCar</h1>

         <img src='../../assets/quotes.svg' alt='quotes' className='m-2 pl-2 hidden sm:block' />
         <p className='text-justify px-4 text-lg  text-[#FAF9F6]' style={{fontFamily:'louis'}}>AbujaCar Properties & Automobile Ltd. was founded in the year 2014. The company is an automobile dealership which basically imports both brand new and foreign used cars across all the brands. We offer other services such as
car rebrand and upgrade.</p>
        </motion.div>
        </section>
    </AnimatePresence>
  );
};

export default SectionWrapper(About,'about');
