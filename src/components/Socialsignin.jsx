import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input,message } from 'antd';
// Import the functions you need from the SDKs you need
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword  } from "firebase/auth";
import { auth2 } from './firebase/firebaseConfig'
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Iconify from './iconify'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Logo from './logo';


import { bgGradient } from './css';
const Socialsignin = () => {
  const [isLoading, setLoading] = useState(false);
  const theme = useTheme();  
  const [showPassword,setShowPassword]=useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();
 
  const handleGoogle = async (e) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth2, provider);
      const user = result.user;
      //console.log("User signed in with Google:", user);
  
      // You can access user information like displayName, email, photoURL, etc.
     // console.log("User displayName:", user.displayName);
    //  console.log("User email:", user.email);
    //  console.log("User photoURL:", user.photoURL);
  setLoading(true)
      const response = await fetch(`https://abujacar.org/api/socialgooglesignin/${user.email}/${user.displayName}`, {
        method: 'POST'
      })
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const responseData = await response.json();
      Navigate('/uploadsocialcar', { state: responseData });
      // You can do further processing with the user data here
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
    finally{
      setLoading(false)
    }
  }



  const handleSubmit2 = async () => {
    try {
      setLoading(true)
      const userCredential = await signInWithEmailAndPassword(auth2, email, password);
      // Signed up 
      const user = userCredential.user;



      const response = await fetch(`https://abujacar.org/api/socialemailsignin/${user.email}`, {
        method: 'POST'
      })
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const responseData = await response.json();



      if(user.email){Navigate('/uploadsocialcar', { state: responseData })
    
    }
     
      // ...
    } catch (error) {
      setLoading(false);
      console.error('Error logging in:', error);
      message.error('An error occurred while signing in');
    }
    finally{setLoading(false)}
  };

  const renderForm = (
    <>
    
      <Stack spacing={3}>
        <TextField name="email" label="Email address"  onChange={(e)=>setEmail(e.target.value)}/>
 
        <TextField
          name="password"
          label="Password"
          onChange={(e)=>setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">

                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link className='cursor-pointer' variant="subtitle2" underline="hover" onClick={() => Navigate('/socialforgotuserpassword')}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
      fullWidth
      size="large"
      type="submit"
      variant="contained"
      color="inherit"
      loading={isLoading}
onClick={handleSubmit2}

      loadingIndicator={<CircularProgress size={24} />} // Optional: Customize loading indicator
    >
      Login
    </LoadingButton>
    </>
  );




  return (
    

    <Box
    sx={{
      ...bgGradient({
        color: alpha(theme.palette.background.default, 0.9),
        imgUrl: '/assets/background/overlay_4.jpg',
      }),
      height: 1,
    }}
  >
   
  
    <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
      <Card
        sx={{
          p: 5,
          width: 1,
          maxWidth: 420,
        }}
      >
         <Logo />
        <Typography variant="h4">Sign in to AbujaCar</Typography>
  
        <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={()=>Navigate('/socialsignup')} className='cursor-pointer'>
            Get started
          </Link>
        </Typography>
  
        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={handleGoogle}
            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
          >
            <Iconify icon="eva:google-fill" color="#DF3E30" />
          </Button>
  
          
        </Stack>
  
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            OR
          </Typography>
        </Divider>
  
        {renderForm}
      </Card>
    </Stack>
  </Box>

 
  );
};










export default Socialsignin;




 {/*<Form className="p-6 sm:w-1/2 mx-auto">
    <Form.Item label="Email address">
      <Input
        type="email"
        className=""
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
    </Form.Item>

    <Form.Item label="Password">
      <Input.Password
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        value={password}
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2"
      />
    </Form.Item>

    <Form.Item>
      <Button
        disabled={isLoading || !email || !password}
        onClick={handleSubmit}
        className="mb-2"
      >
        {isLoading ? 'Loading…' : 'Submit'}
      </Button>
    </Form.Item>

    <GoogleButton onClick={handleGoogle}>Sign in with google</GoogleButton>
    <p>
      <span onClick={() => Navigate('/socialforgotuserpassword')} style={{ cursor: 'pointer', color: 'blue' }}>
        Forgot your password?
      </span>
    </p>
  </Form>*/}
// ----------------------------------------------------------------------


