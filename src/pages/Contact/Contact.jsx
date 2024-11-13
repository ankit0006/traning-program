import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cv from '../../assets/images/cv.webp';

import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phoneNumber: Yup.number()
    .min(10, 'Enter valid phone number')
    .required('Phone number is required'),
  message: Yup.string()
    .max(500, 'Must be 500 characters or less')
    .required('Message is required'),
});

const ContactUs = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form data:', values);
    },
  });
  return (
    <Container maxWidth={false} class='flex h-screen p-0 items-center'>
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={12} md={7} className="leftSideImage" 
          style={{ position: 'relative', background: `url(${cv}) center/cover no-repeat`, height: '100%',width:'60%' }}>
        </Grid>

        <Grid item xs={12} md={5} 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 ' }}>
          <Box width="100%" maxWidth="sm">
            <Typography variant="h3" align="center" gutterBottom>
              Contact Us
            </Typography>
            <br/>
            <form onSubmit={formik.handleSubmit} className='formContainer'>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    name="name"
                    autoComplete="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
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
                    label="Phone Number"
                    name="phoneNumber"
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
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="outlined" color="primary" fullWidth>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
