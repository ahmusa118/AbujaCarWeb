import React from 'react'
import { slideIn } from '../utils/motion';
import { motion,AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import {headContainerAnimation, headContentAnimation,headTextAnimation,slideAnimation} from '../config/motion'

const Aboutpage1 = () => {
  return (
    <AnimatePresence>
    <motion.div variants={slideIn("down", "tween", 0.2, 1)}  className='mt-2 bg-black '>
<div className='grid md:grid-cols-3'>
  <div className='col-span-2'><img src='../../assets/abujacarabout.jpg' alt='aboutpage2' /></div>

<div className='col-span-1'>
<motion.div {...slideAnimation('down')} className='hidden sm:block text-center col-span-1'>
         <h1 className='text-4xl font-roboto text-[#da9100]   mt-20'>Let's roll...</h1>
           <p className='text-justify  text-xl p-6  text-[#FAF9F6] ' style={{fontFamily:'louis'}}>Over the years, we have remained committed to judiciously provide premium services and products across all brands to your door step, fueled by new challenges we constantly co-create solutions to build a better world for everyone.
 After great efforts and obvious results, we finally developed the much neeeded capacity to get projects directly from corporate organizations and government agencies by using our own company’s name. We really appreciate the opportunity to partner with other car dealerships in the industry, this collaboration has enabled our company could to grow rapidly. In 2020, we continuously served our customers in Abuja and other states in
and quality service for individual and corporate mobility.
           </p>
</motion.div>
</div>
</div>
<motion.div className=' block sm:hidden mt-4 '>
       <h1  className='font-roboto text-3xl pl-4 text-[#da9100] font-bold' >Let's roll...</h1>
       <motion.p className='text-justify  text-lg p-4  text-[#FAF9F6] ' style={{fontFamily:'louis'}}>Over the years, we have remained committed to judiciously provide premium services and products across all brands to your door step, fueled by new challenges we constantly co-create solutions to build a better world for everyone.
After great efforts and obvious results, we finally developed the much neeeded capacity to get projects directly from corporate organizations and government agencies by using our own company’s name. We really appreciate the opportunity to partner with other car dealerships in the industry, this collaboration has enabled our company could to grow rapidly. In 2020, we con- tinuously served our customers in Abuja and other states in
and quality service for individual and corporate mobility.
       
       </motion.p>

    </motion.div>
    </motion.div>
    </AnimatePresence>
  )
}

export default SectionWrapper(Aboutpage1,'aboutpage1')