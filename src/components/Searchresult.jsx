import React,{useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { Carousel,message,Button,Skeleton } from 'antd'
const Searchresult = () => {
    const location=useLocation()
    const Navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const handleCarClick=(key)=>{
        if(localStorage.getItem('responseData')==null){
            message.error('Login please')
        }else {
            Navigate('/cardetails', { state: { key, details: JSON.parse(localStorage.getItem('responseData')) } });
    
        }
          }
          const handleLoad=()=>{
            setLoading(true)
          }
  return (
    <div className='p-4'>
       <div className='font-roboto ml-2'>Results: {location.state.length}</div> 
        <div className='grid sm:grid-cols-3 '>
            {location.state.map((car) => (
              <div key={car._id} className={`m-2 rounded overflow-hidden shadow `}>
                {!loading && (
                <Skeleton className='h-96 w-80 object-cover p-2' />
              )}
<div className={`${loading?'':'hidden'}`}> 

<Carousel  className=''>
                {car.images.map((car)=>{
                    return (<div key={car}>
                
                        <img 
                        onLoad={handleLoad}
                        src={`https://abujacar.org/api/indcar/${car}`} alt='img' className={`w-full object-cover  h-96 rounded-t`} />
                    </div>)
                })}
                </Carousel>
                <div className='p-2'>
               <p><strong>Make:</strong> <p className='uppercase inline-block'>{car.make}</p></p>
              
                <Button className='flex w-full justify-center' onClick={()=> handleCarClick(car)}>View Details</Button>
              </div>
              </div>
         </div>
            ))}
            
            </div>
                 </div>
  )
}

export default Searchresult