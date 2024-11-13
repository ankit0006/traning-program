import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import login from '../../assets/images/login.png';
import axios from 'axios';

import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('https://670f57f23e71518616576ea4.mockapi.io/api/users');
        const users = await response.json();

        const user = users.find(user => user.email === values.email && user.password === values.password);

        if (user) {
          const token = user.userId;
          const firstName = user.firstName;
          console.log(firstName);
          localStorage.setItem('authtoken', token);
          localStorage.setItem('isAuthenticated', true); 
          localStorage.setItem('firstName', firstName);
          setErrorMessage('');
          resetForm();
          navigate('/dashboard'); 
        } else {
          setErrorMessage('Invalid email or password');
          resetForm();
        }
      } catch (error) {
        console.error('Error during sign in:', error);
        setErrorMessage('Something went wrong. Please try again.');
      }
    },
  });

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const token = response.credential;

      const userInfo = JSON.parse(atob(token.split('.')[1]));
      const userData = {
        name: userInfo.name,
        email: userInfo.email,
        token: token,
      };
      
      // const existingUserResponse=await axios.get(`https://670f57f23e71518616576ea4.mockapi.io/api/social-links?email=${userInfo.email}`);
      // const existingUser=existingUserResponse.data;
        await axios.post('https://670f57f23e71518616576ea4.mockapi.io/api/social-links', userData);
      

      localStorage.setItem('authtoken', token);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('firstName', userInfo.name);

      setErrorMessage('');
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Error storing user data:", error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleGoogleLoginFailure = () => {
    setErrorMessage('Google Sign-In was unsuccessful. Try again.');
    navigate('/signin');
  };

  // const handleFacebookLogin = async (response) => {
  //   try {
  //     const { accessToken, name, email } = response;
  //     const userData = { name, email, token: accessToken };
  //     await axios.post('https://670f57f23e71518616576ea4.mockapi.io/api/social-links', userData);

  //     localStorage.setItem('authtoken', accessToken);
  //     localStorage.setItem('isAuthenticated', true);
  //     localStorage.setItem('firstName', name);

  //     setErrorMessage('');
  //     navigate('/dashboard');
  //   } catch (error) {
  //     console.error("Error storing user data:", error);
  //     setErrorMessage('Something went wrong. Please try again.');
  //   }
  // };

  // const handleFacebookFailure = () => {
  //   setErrorMessage('Facebook Sign-In was unsuccessful. Try again.');
  //   navigate('/signin');
  // };

  const handleInputFocus = () => {
    setErrorMessage('');
  };

  // forgetpassword
  

  return (
    <Container maxWidth={false}  class="flex justify-center items-center h-[90.7vh]  p-0 overflow-hidden bg-white shadow-lg">
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              height: '100vh',
              backgroundImage: `url(${login})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Grid>

        <Grid item xs={12} md={5} class="flex items-center justify-center p-0 ml-5">
          <Box mt={5} px={3} display="flex" alignItems="center" height="100%">
            <Box width="100%" maxWidth='sm'>
              <Typography variant="h3" align="start" gutterBottom>
                Sign In
              </Typography>
              <br />
              <br />
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      className="emailClass"
                      label="Email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formik.values.email}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleInputFocus(); 
                      }}
                      onFocus={handleInputFocus}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      className="passwordClass"
                      label="Password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      value={formik.values.password}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleInputFocus(); 
                      }}
                      onFocus={handleInputFocus}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      required
                    />
                  </Grid>
                  {errorMessage && (
                    <Grid item xs={12}>
                      <Typography color="error">{errorMessage}</Typography>
                    </Grid>
                  )}
                  <div className='flex mt-4 justify-end w-full -ml-14'>
                    <Link to="/forget-password" className="text-lg text-gray-700">Forget password ?</Link>
                  </div>
                  <Grid item xs={12} class="flex flex-col m-4">
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      align="right"
                      sx={{ width: '28vw', margin:'15px 3px', borderRadius:'25px' }}
                    >
                      Log In
                    </Button>
                 
                        <p className='flex justify-center text-lg gap-2 text-gray-500'>
                          Don't have an account ?{' '}
                          <Link to="/register">
                          <a href="/register" className='font-semibold text-black'>Sign up</a>
                          </Link>
                        </p>

                        <div className='divider flex items-center justify-center text-center mt-10 mb-5'>
                          <span>OR</span>
                      </div>
                  </Grid>

                  <div className="flex flex-col items-center justify-center gap-5 mt-2 ml-2">
                  <Button className="text-lg m-8 flex justify-center">
                  <Grid item xs={12} >
                    <GoogleLogin 
                      onSuccess={handleGoogleLoginSuccess}
                      onError={handleGoogleLoginFailure}
                    />
                  </Grid>
                  </Button>

                  {/* <Button>
                  <Grid item xs={12}>
                    <FacebookLogin
                      appId="470397092131684"
                      fields="name,email"
                      callback={handleFacebookLogin}
                      onFailure={handleFacebookFailure}
                      render={renderProps => (
                        <Button
                          onClick={renderProps.onClick}
                          variant="outlined"
                          color="secondary"
                        >
                          Login with Facebook
                        </Button>
                      )}
                    />
                  </Grid>
                  </Button> */}
                  </div>

                </Grid>
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;
