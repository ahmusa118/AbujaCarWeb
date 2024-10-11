

import React, { useState,useEffect } from 'react';

import { SectionWrapper } from '../hoc';


import { Carousel } from 'antd';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { features } from '../../constants';
import {motion}  from 'framer-motion'
import '../styles.css'

import { fadeIn,textVariant } from '../utils/motion';

import { useNavigate } from 'react-router-dom';

const TimeCard=({index,item})=>{
  const navigate=useNavigate()
  return(
    <VerticalTimelineElement index={index}
    textClassName={{fontWeight:100,color:'#000000'}}
contentStyle={{ background: '#080808', color: '#fff' }}
contentArrowStyle={{ borderRight: '7px solid  #000000' }}
date="2011 - present"
iconStyle={{ background: '#fff', color: '#fff', cursor:'pointer' }}
icon={<img src={item.logo} className='rounded-full' />}
iconOnClick={()=>alert(item.title)}


>
        <div className='mx-auto mb-6 font-thin'>
          <h3 className='text-[#da9100] font-bold text-3xl ' style={{fontWeight:300}}>{item.title}</h3>
          <p className='font-roboto text-justify font-thin text-[#faf9f6] ' style={{fontWeight:100,fontFamily:'louis'}}>{item.content}</p>
          <button onClick={()=>navigate(item.page)}>{item.page}</button>
        </div>

      

      <Carousel autoplay infinite='true' dotPosition='top' className='w-full'>
      {item.images.map((image, imageIndex) => (
        <div key={imageIndex}>
          <img src={image} alt={`slide-${imageIndex}`}  className='h-[370px] w-full'/>
        </div>
      ))}
    </Carousel>
    </VerticalTimelineElement>
  )
}
const FeatureCard = ({ images,title,content,index }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const truncatedContent = content.slice(0, 150);
  const remainingContent = content.slice(150);

  return (
    <motion.div variants={fadeIn('right','spring',0.5*index,0.75)} className="group flex justify-center text-center relative overflow-hidden rounded-xl  cursor-pointer">

      <img
        src={images[0]}
        alt="An image"
        className="rounded-xl object-cover ease-in-out duration-500 group-hover:scale-125 w-full sm:w-[500px] m-2 p-4 transition-all"
      />



      <div className="absolute w-full h-full group-hover:bg-black group-hover:opacity-80 transition-all duration-500" />

      <h3 className='absolute top-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out font-roboto text-[#da9100] text-xl'>
        {title}
      </h3>


      <h3 className="p-3 text-justify absolute top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out " style={{fontFamily:'louis'}}>
        {showFullContent ? content : truncatedContent}
        {content.length > 150 && !showFullContent && (
          <span className="text-[#da9100] cursor-pointer" onClick={() => setShowFullContent(true)}>
            {' '}
            Read more...
          </span>
        )}
        {content.length > 150 && showFullContent && (
          <span className="text-[#da9100] cursor-pointer" onClick={() => setShowFullContent(false)}>
            {' '}
            Read less
          </span>
        )}
      </h3>

    </motion.div>
  );
};



const Whyabujacar = () => {

  const [page,setPage]=useState('')


;
 // ... (your imports and other code)

if (page === 'slider') {
  return (
    <div className='bg-black px-4 outline-none font-thin text-lg'>
      <h1 className='md:text-center text-3xl p-2 font-bold font-roboto text-[#da9100]'>List of Services</h1>
 
      {features.map((img, index) => (
        <div key={index} >
          
     <div className="relative w-full py-2 flex flex-col block md:hidden overflow-hidden">
        <div className='pl-2'>
         <Carousel autoplay infinite='true'   dotPosition='right' /*className='transform hover:scale-110  transition ease-out duration-500'*/ fade>
            {img.images.map((image, imageIndex) => (
              <div key={imageIndex}>
                <img src={image} alt={`slide-${imageIndex}`} />
              </div>
            ))}
          </Carousel>
</div>
            <h1 className='mt-4 ml-2 text-xl text-[#da9100] font-roboto font-bold'>{img.title}</h1>
            <p className='text-justify  p-2' style={{fontFamily:'louis'}}>{img.content}</p>
      </div>
     
      <div className='text-black'>AbujaCar</div>
        </div>
      ))}


<VerticalTimeline 

className='hidden md:block'>       

{features.map((item, index) => (
 <TimeCard item={item} index={index} />
))}
     
 
    </VerticalTimeline>



    </div>
  );
} 
 else 
  {
  return (
    <div>
      <div className='shadow-lg relative'>
       
        <div className='bg-black '>
<h1 className=' px-4 font-bold text-3xl pt-2 font-roboto text-[#da9100]'>List of services</h1>
<div className='grid sm:grid-cols-3' onClick={()=>setPage('slider')}> 
  {features.map((feat,index)=>(<FeatureCard {...feat} index={index} />))}
</div>
         
        </div>
      </div>
    </div>
  )
}
};

export default SectionWrapper(Whyabujacar,'Whyabujacar');











        