import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#d4d4d4',
};
const Wordslider = () => {

  return (
    <Carousel autoplay  fade infinite>
         <div className='sm:text-mammoth font-SyneMono text-3xl font-bold sm:mx-20 leading-tight pl-1 md:pl-10 pt-10 pb-5 text-white'>
        We are <br className='hidden md:block ' /><span className=''>Innovation driven...</span> <img src='../../assets/whitequote.svg' alt='quote' className=' w-20 h-20 hidden  md:block' />
      </div>
      <div>
      <h3 className='text-lg md:text-3xl  font-bold sm:mx-20 leading-tight pl-1 md:pl-10 pt-10 pb-5 text-white' style={{fontFamily:'louis'}}> Over the years, we have remained committed to judiciously provide premium services and products across all brands to your door step, fueled by new challenges we constantly co-create solutions to build a better world for everyone.</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};
export default Wordslider;