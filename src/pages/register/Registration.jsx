import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import sign from '../../assets/images/sign.jpg';

import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material';

// Validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('First Name is required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Last Name is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUpForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const userId = uuidv4();
      const payload = {
        ...values,
        userId: userId,
      };
      console.log(payload);
      try {
        const response = await fetch('https://670f57f23e71518616576ea4.mockapi.io/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log('Form data sent to MockAPI:', data);
        alert('Sign up successful!');
        resetForm();
      } catch (error) {
        console.error('Error during sign up:', error);
        alert('Sign up failed. Please try again.');
      }
    },
  });

  return (
    <Container maxWidth={false} className="w-full h-[calc(100vh-80px)] pr-0 bg-white">
      <Grid container className="h-full">
        {/* Left side - Sign up form */}
        <Grid item xs={12} sm={6} className="flex justify-center items-center p-5 ">
          <Box mt={5} px={3}>
            <Typography variant="h3" align="center" gutterBottom className='m-5'>
              Sign Up
            </Typography>
            <form onSubmit={formik.handleSubmit} className="signUpForm w-full mt-5">
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    autoComplete="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    type="text"
                    autoComplete="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="same-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="outlined" color="primary" fullWidth>
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>

        {/* Right side - Image */}
        <Grid item xs={12} sm={6} className="flex justify-center items-center">
          <Box className="imageContainer w-full h-full">
            <img
              src={sign}
              alt="Sign Up Image"
              className="w-full h-full object-cover"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUpForm;
