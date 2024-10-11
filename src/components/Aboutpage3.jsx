import React from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import state from '../store';
import { useSnapshot } from 'valtio';
import {headContainerAnimation, headContentAnimation,headTextAnimation,slideAnimation} from '../config/motion'
// pb-3 pt-1 
const Aboutpage3 = () => {
  const snap=useSnapshot(state)
  return (
    <AnimatePresence>
    <motion.main {...slideAnimation('up')} className='fixed bottom-0 right-0 z-10 cursor-pointer' onClick={()=>state.intro=!state.intro}>
   <h1 className='absolute z-20 right-0 transform skew-y-[-28deg] skew-x-12 text-[#faf9f6]  font-roboto uppercase font-bold pb-5 pt-1  pr-2'>flyer</h1>
      <div className="h-0 w-0 border-t-[60px] border-r-[100px] border-b-[-25px] 
        border-solid border-t-transparent border-b-transparent border-r-[#da9100] text-black mt-[-25px] relative">
 
      </div>
    </motion.main>
    </AnimatePresence>
  );
};

export default Aboutpage3;
