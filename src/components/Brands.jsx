import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'
import { Modal,ConfigProvider } from 'antd'
import { frontslider } from '../../constants'
import {Carousel} from 'antd'
import { Spin,Flex } from 'antd';
const Brands = () => {
  const snap=useSnapshot(state)
  
  return (
    <div>
      <ConfigProvider
  theme={{
    token: {
      colorIconHover:'#faf9f6',
      colorIcon:'#da9100'
    },
  }}
>
<Modal open={snap.intro}  onCancel={() => state.intro=!state.intro}   
footer={false}
className='relative '
>
<div className='font-roboto absolute top-0 w-full right-0 bg-black rounded-lg bg-no-repeat bg-cover items-center border-8 border-gray-500 border-opacity-20'>

<Carousel autoplay infinite='true' dotPosition='top' className='w-full'>
     
          {frontslider.map((slide)=>(
            <div className=''>
            <img src={slide} alt="" className='w-full relative rounded-t'/>

            </div>

          ))}
  
    </Carousel>

</div>

</Modal>
</ConfigProvider>
    </div>
  )
}

export default Brands