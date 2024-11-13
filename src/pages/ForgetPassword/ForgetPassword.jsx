import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.get('https://670f57f23e71518616576ea4.mockapi.io/api/users');
      const users = response.data;
      const user = users.find(user => user.email === email);

      if (user) {
        setMessage('A password reset link has been sent to your email.');
        
        setTimeout(() => navigate(`/reset-password?email=${encodeURIComponent(email)}`), 3000);
      } else {
        setMessage('No account found with that email address.');
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Container>
      <Box mt={5} textAlign="center">
        <Typography variant="h4">Forget Password</Typography>
        <TextField
          label="Enter your email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: 2 }}
        >
          Send Reset Link
        </Button>
        {message && (
          <Typography variant="body2" color={message.includes('error') ? 'error' : 'success'} mt={2}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ForgetPassword;
