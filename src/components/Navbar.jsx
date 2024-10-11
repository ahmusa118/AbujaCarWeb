
import { useState } from 'react';
import { close, menu } from '../../assets';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, } from 'react-router-dom';
import { SectionWrapper } from '../hoc';
import './ind.css'
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '../config/motion';
import { fadeIn } from '../utils/motion';
const Navbar = ({navLinks}) => {
  const navigate=useNavigate()
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  const handleNavLinkClick = (navTitle, navId) => {
    setActive(navTitle);
    setToggle(false);
    const targetElement = document.getElementById(navId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
else if (navId === 'team') {
  window.scrollTo(0, 0);
  navigate('team')
} 
else if (navId === 'back') {
  window.scrollTo(0, 0);
  navigate('/')
} 
else if (navId === 'gallery') {
  window.scrollTo(0, 0);
  navigate('/gallery')
} 
  };
const item={
  exit:{
    opacity:0,
    height:0,
    transition:{
      ease:"easeInOut",
      duration:0.3,
      delay:.5
    }
  }
}
  return (

      <nav className="w-full flex py-6 justify-between items-start navbar   p-4 bg-black  mb-4 fixed z-20 border-b-2">
        <div className="flex flex-row items-start relative ">
          <img
            alt="abjcar"
            src="../assets/abujacarnormal.jpeg"
            className="sm:w-[120px] sm:h-[120px] w-[90px] h-[90px] mr-2 cursor-pointer"
            onClick={()=>navigate('/')}
          />

          <motion.h3
            {...headTextAnimation}
            className="text-white my-auto sm:text-4xl text-2xl font-roboto cursor-pointer"
          onClick={()=>navigate('/')}
          >
            Abuja<span className="text-[#DA9100]">Car</span>
          </motion.h3>

         
        </div>
        <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[38px] h-[38px] object-contain cursor-pointer block sm:hidden my-8  border rounded-full p-2 border-red-100 items-end absolute right-2"
            onClick={() => setToggle(!toggle)}
          />
        <ul className="list-none sm:flex hidden justify-end items-center flex-1 py-12">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`cursor-pointer  nav2 transition duration-500 ease-in-out mb-[-25px]  ${
                active === nav.title ? 'text-[#da9100]' : 'text-dimWhite'
              } ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}
              data-text={`\u00A0${nav.title}`}
              onClick={() =>{ handleNavLinkClick(nav.title, nav.id), setActive(nav.title)}
            
            }
            >
              &nbsp;{nav.title}&nbsp;
              
            </li>
            
          ))}
        
        </ul>






        <div className="sm:hidden flex flex-1 ">
         

    <AnimatePresence >
         {toggle && (
          <motion.div
          variants={item}
          initial={{height:0,opacity:0}}
          animate={{height:'100vh',opacity:1}}
          transition={{duration:.3}}
          exit='exit'

           // className={`flex p-6 bg-black absolute top-20 right-0  my-10 w-full  sidebar  transition all duration-500 ease-in-out z-10`}
          >
           <div className='bg-black '>
        


        <div className='absolute top-60 right-[40%]  '>
<ul className="list-none flex justify-end items-start flex-1 flex-col ">
{navLinks.map((nav, index) => (
 
  <li
    key={nav.id}
    className={` cursor-pointer transition duration-500 ease-in-out nav ${
      active === nav.title ? 'text-[#da9100]' : 'text-dimWhite'
    } ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'}`}
    data-text={`\u00A0${nav.title}`}
    onClick={() => {handleNavLinkClick(nav.title, nav.id), setActive(nav.title)}
 
  }
  >
    &nbsp;{nav.title}&nbsp;
   
  </li>

))}

  </ul>

</div>





    
            </div> 
           
          </motion.div>

         )} 
         </AnimatePresence>
        </div>
        
      </nav>

  );
};

export default Navbar;

