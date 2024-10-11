import React, { useEffect, useState,useRef } from 'react';
import { Empty, Button, Pagination,Modal, Input,Form,Spin,message,Select,Skeleton } from 'antd';
import { close,menu } from '../../assets';
import { Typography } from 'antd';
import Realranavbar from './Realranavbar'
import { raNavLinks} from '../../constants';

import { UserOutlined } from '@ant-design/icons';
import Activitynav from './Activitynav';
import SearchIcon from '@ant-design/icons/SearchOutlined';
import Search from './Search';

import { useNavigate } from 'react-router-dom';
// ... (other imports)

const Tl = () => {
  const { Option } = Select;
    const Navigate=useNavigate()
    const {Text}= Typography
    const storedPage = localStorage.getItem('currentPage');
    const initialPage = storedPage ? parseInt(storedPage, 10) : 1;
  const [toggle,setToggle]=useState(false)
    const [carData, setCarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalItems, setTotalItems] = useState(0);
    const [isSearchModalVisible, setSearchModalVisible] = useState(false);
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const [isSignupModalVisible, setSignupModalVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false)
   const ranavbarRef = useRef(null);

   useEffect(() => {
     const handleScroll = () => {
       const ranavbarHeight = ranavbarRef.current.clientHeight;
       const ranavbarBottom = ranavbarRef.current.getBoundingClientRect().bottom;
 
       setIsSticky(window.scrollY > ranavbarBottom - ranavbarHeight);
     };
 
     window.addEventListener('scroll', handleScroll);
     return () => {
       window.removeEventListener('scroll', handleScroll);
     };
   }, [])
    const showLoginModal = () => {
      setLoginModalVisible(true);
    };
  

  
    const handleLoginCancel = () => {
      setLoginModalVisible(false);
    };
  
    const handleSignupCancel = () => {
      setSignupModalVisible(false);
    };
  
    const handleLogin = async (loginData) => {
      // Implement your login logic here
      console.log('Login Data:', loginData);
      handleLoginCancel();
    };
    const firstletter=(word)=>{
      const x=word.replace(word[0],word[0].toUpperCase())
      return x
            }
    const handleSignup = async (signupData) => {
      // Implement your signup logic here
      console.log('Signup Data:', signupData);
      handleSignupCancel();
    };
    const fetchData = async (key) => {
        try {
          // Fetch fresh data
          const response = await fetch('https://abujacar.org/api/individualdashboard', {
            method: 'GET',
            headers: { Authorization: `Bearer ${key}` },
          });
     
          if (response.ok) {
            const responseData = await response.json();
            localStorage.setItem('responseData', JSON.stringify(responseData));
       setLoginModalVisible(false)
          setToggle(false)
          } else {
            message.error('Error fetching data from the server');
            return null;
          }
        } catch (error) {
          console.error('Error fetching data:', error);
         message.error('An error occurred while fetching data');
          return null;
        }
      };
      
      
      const LoginForm = ({ onCancel, onLogin }) => {
        const onFinish = async (values) => {
          const em = values.email;
          const pass = values.password;
      
          try {
            setLoading(true);
            const response = await fetch('https://abujacar.org/api/individualogin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                em,
                pass,
              }),
            });
            const data=await response.json()
      
      if(data.status=='None'){
Navigate('/verify',{state:{email:data.email,verification:data.code}})
      }

              if (data.token) {
     
                // Fetch additional data and store in localStorage
            
                await fetchData(data.token);
      
                // Fetch additional data and store in localStorage
              
              } else if (data.error) {
                message.error(data.error);
               
              
            } else if(data.status=='None'){
             
              message.success('Please verify');
            }
            
          } catch (error) {
         
            console.error('Error logging in:', error);
           message.error('An error occurred while logging in');
          }
          
          finally{
            setLoading(false)
          }
        }




        return (
          <Form onFinish={onFinish} layout="vertical">
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email!' }]}>
        <Input placeholder="Enter email" />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
        <Input.Password placeholder="Enter password" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit">
          Login
        </Button>
      </Form.Item>

      <Form.Item>
        <a onClick={()=>Navigate('/forgotuserpassword')} >Forgot Password?</a>
      </Form.Item>
    </Form>
        );
      };
      
      const SignupForm = ({ onCancel, onSignup }) => {
        // Implement your signup form fields
        return (
          <div>
            {/* Add your signup form fields here */}
            <Button  onClick={()=>Navigate('/usersignup')}>
              Signup
            </Button>
          </div>
        );
      };


    const showModal = () => {
      setSearchModalVisible(true);
    };
  
    const handleCancel = () => {
      setSearchModalVisible(false);
    };
  
    useEffect(() => {
      // Store the current page in localStorage
      localStorage.setItem('currentPage', currentPage.toString());
  
      const fetchData = async () => {
        try {
          setLoading(true); // Set loading to true when starting to fetch data
          const response = await fetch(`https://abujacar.org/api/approvedtl?page=${currentPage}`);
          const data = await response.json();
  
          if (response.ok) {
            setCarData(data);
          } else if (response.status === 404) {
            setCarData([]);
          } else {
            console.error(`Error fetching data: ${data.error}`);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); // Set loading to false when data fetching is complete
        }
      };
  
      fetchData();
    }, [currentPage]);
    const handleImageLoaded = () => {
      setImageLoaded(true);
    };
  
    const handleImageError = () => {
      // Handle image loading error here
    };
    useEffect(() => {
      const fetchTotalItems = async () => {
        try {
          const response = await fetch('https://abujacar.org/api/totalItems'); // Replace with the actual endpoint to get the total items
          const data = await response.json();
  
          if (response.ok) {
            setTotalItems(data.totalItems);
          } else {
            console.error(`Error fetching total items: ${data.error}`);
          }
        } catch (error) {
          console.error('Error fetching total items:', error);
        }
      };
  
      fetchTotalItems();
    }, []); // Empty dependency array to run only once on component mount

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    // Calculate the total number of pages based on the total number of items and desired page size
    const pageSize = 6; // Adjust this based on the number of items you want to display per page
    const totalPages = Math.ceil(totalItems / pageSize);
    const handleSearch = async (filters) => {
        try {
          // Convert price and mileage arrays to string
          const filtersString = JSON.stringify(filters);
          setLoading(true)
          const response = await fetch('https://abujacar.org/api/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: filtersString,
          });
          const data = await response.json();
          if (data) {
            // Handle the search results (e.g., update state with the search results)
            Navigate('/search',{state:data})
          } else {
            console.log(data)
            message.error('Failed. Please try again')
          }
        } catch (error) {
          console.error('Error searching cars:', error);
        }
        finally{
          setLoading(false)
        }
      };
      const handleCarClick=(key)=>{
    if(localStorage.getItem('responseData')==null){
        setLoginModalVisible(true)
    }else {
        Navigate('/cardetails', { state: { key, details: JSON.parse(localStorage.getItem('responseData')) } });

    }
      }


      useEffect(() => {
        // Check if response data is stored in localStorage
        const storedData = localStorage.getItem('responseData');
        
        if (storedData) {
          const { email, expiration } = JSON.parse(storedData);
    
          // Check if the data is still valid based on the expiration timestamp (in milliseconds)
          if (expiration && expiration > Date.now()) {
            setEmail(email);
          }
        }
      }, [])

    return (
      <div className=' h-full'>
   
        <div  className=''>
        {loading ? (
          <div className='flex items-center justify-center  my-[25%]'>
          <Spin size='large' />
          </div>
        ) : carData.length > 0 ? (
          <div >
             
          
          <Search
          
            visible={isSearchModalVisible}
            onSearch={handleSearch}
            onCancel={handleCancel}
          />

<div className="flex justify-end ">

  <div className='fixed z-20'>
    
    <Realranavbar navLinks={raNavLinks} 
    toggle={toggle}
    messnav={()=>Navigate('/usermessages')}
    click={()=>setToggle(!toggle)}
      username={localStorage.getItem('responseData') ? JSON.parse(localStorage.getItem('responseData')).email : null}
      showLoginModal={showLoginModal}
      showSignupModal={()=>Navigate('/usersignup')}
      showModal={showModal}
      logout={() => {
        localStorage.removeItem('responseData');
        window.location.reload();
      }}
    />
  

    

    </div>

    
       
      </div>


  


      <Modal title="Login" open={isLoginModalVisible} onCancel={handleLoginCancel} footer={null}>
        <LoginForm onCancel={handleLoginCancel} onLogin={handleLogin} />
      </Modal>

      <Modal title="Signup" open={isSignupModalVisible} onCancel={handleSignupCancel} footer={null}>
        <SignupForm onCancel={handleSignupCancel} onSignup={handleSignup} />
      </Modal>
<div className='relative'>
<img src='../../assets/coolmerc1.jpeg'  alt='' />
<img src='../../assets/coolmer2.jpeg' className='md:hidden' alt='' />
</div>

            <div className={`z-10 p-2 grid md:grid-cols-4 absolute top-20 mt-2 gap-2 border-b`}>

            {carData.map((car) => (

              <div key={car._id} className='gap-2 bg-gray-300 my-2 overflow-hidden shadow w-full items-center mx-auto'>
              {!imageLoaded && (
                <Skeleton className='h-96 w-80 object-cover p-2 ' />
              )}
              <img
                src={`https://abujacar.org/api/indcar/${car.images[0]}`}
                alt={`${car.images[0]}`}
                className={`h-96 w-full object-cover ${imageLoaded ? '' : 'hidden'}`}
                onLoad={handleImageLoaded}
            
              />   <div className='p-2 flex flex-col font-roboto'>
              
                <Button onClick={()=> handleCarClick(car)}><Text className='text-white'>View Details</Text></Button>
                </div>
              
              </div>
         
            ))}
                 </div>
          </div>
        ) : (
          <Empty />
        )}

        <div className='mt-3 mb-3'>
        <Pagination
  current={currentPage}
  total={totalPages * 10}
  onChange={handlePageChange}
  showSizeChanger={false}
  showQuickJumper
  loading={loading}
  style={{ color: 'black' }} // Set the text color to white
/>
        </div>
      </div>
      </div>
    );
  };
  
  export default Tl;
  