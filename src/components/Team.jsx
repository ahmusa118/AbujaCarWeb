import React from 'react'
import { SectionWrapper } from '../hoc'
import Navbar from './Navbar'
import { bck } from '../../constants'
import { teams } from '../../constants'
import { motion } from 'framer-motion'
import { fadeIn,textVariant } from '../utils/motion';
import Footer from './Footer'
import { useState } from 'react'
import { Modal,Button,Typography,ConfigProvider } from 'antd'
import './ind.css'
const { Title, Paragraph } = Typography;

import { createStyles, useTheme } from 'antd-style';
const useStyle = createStyles(({ token }) => ({
  'my-modal-body': {
    background: token.blue1,
    padding: token.paddingSM,
  },
  'my-modal-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },
  'my-modal-header': {
    borderBottom: `1px dotted ${token.colorPrimary}`,
  },
  'my-modal-footer': {
    color: token.colorPrimary,
  },
  'my-modal-content': {
    border: '1px solid #333',
  },
}));

const TeamCard = ({ image, name, index, position,onClick }) => {


  return (
    <motion.div
      variants={fadeIn('down', 'spring', 0.5 * index, 0.75)}
      className="group flex justify-center text-center relative overflow-hidden  cursor-pointer p-2 mx-auto border-white-500 "
      key={index}
     onClick={onClick}
    >
      <img src={image} alt="img" className=" w-full sm:w-[300px] px-20 sm:px-0 " />
      <div className="absolute w-full h-full group-hover:bg-black group-hover:opacity-80 transition-all duration-500" />
      <h3 className="text-lg absolute top-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out  text-[#da9100] p-2" style={{fontFamily:'louis'}}>
        {name}
      </h3>
      <h3 className="p-2 text-justify absolute top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out " style={{fontFamily:'louis'}}>
        {position}
      </h3>
    </motion.div>
  );
};



const Team = () => {
  const [modal,setModal]=useState(false)
  const [nm,setnm]=useState('')
  const [img,setimg]=useState('')
  const [position,setPosition]=useState('')
  const handleClick=(name,image,position)=>{
setnm(name)
setimg(image)
setPosition(position)  
}
const { styles } = useStyle();
  const token = useTheme();
  const toggleModal = (idx, target) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };
 
 
  return (
    <ConfigProvider
    theme={{
      components: {
        Modal: {
          contentBg:"#ffffff"
        },
      
      },  
      token: {
        borderRadiusLG:10,
        padding:5,
        paddingLG:0,
        colorBgMask: 'rgba(255, 255, 255, 0.4)',
        colorIcon:'#ffffff',
        colorIconHover:'#da9100'
      }   
    }}
  >
    <div className='text-[#faf9f6] bg-black '>
 <Navbar navLinks={bck}/>
 <div className='p-[70px] md:p-[85px] bg-[#faf9f6]'></div>
 <h1 className='text-center text-[#da9100] font-bold text-3xl sm:pt-6 pt-8'>Meet Our Team</h1>

 <div className='p-10  flex flex-col md:flex-row mx-auto'>
<TeamCard {...teams[0]} index={0} onClick={()=>{handleClick(teams[0].name,teams[0].image,teams[0].position),setModal(true)}}/></div>
<div className='p-10  flex flex-col md:flex-row mx-auto '>
{teams.slice(1).map((team, index) => (
  <TeamCard {...team} index={index + 1} key={index + 1} onClick={()=>{handleClick(team.name,team.image,team.position),setModal(true)}}/>
))}

</div>
<Modal open={modal}  onCancel={() => setModal(false)}   
footer={false}
className='relative '
>
  <div className='absolute top-0 left-0 flex flex-row bg-[#000000] border-2 border-gray-500 rounded-md shadow-xl' >
  
            <img src={img} alt='img' className='w-1/2 h-[400px] object-cover overflow-hidden rounded-l'/>
            <div className=''>
          <p className='font-roboto mx-3 mt-9 text-[#da9100] text-xl uppercase'>{nm}</p>
            <p className='text-[#faf9f6] mx-3 mt-2 font-thin'>{position}</p>
            </div>
            </div>
            
        </Modal>
        <hr />
       <h1 className='pl-4 font-thin font-roboto'>©️ 2024 AbujaCar. All rights reserved. Terms . Privacy Policy</h1> 
    </div>
    </ConfigProvider>
  )
}

export default SectionWrapper(Team,'team')