import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const params = new URLSearchParams(location.search);
  const email = params.get('email');

  const handleSubmit = async () => {
    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.get('https://670f57f23e71518616576ea4.mockapi.io/api/users');
      const users = response.data;
      const user = users.find(user => user.email === email);

      if (user) {
        await axios.put(`https://670f57f23e71518616576ea4.mockapi.io/api/users/${user.id}`, {
          ...user,
          password: newPassword,
        });

        setMessage('Your password has been reset successfully!');
        
        setTimeout(() => navigate('/signin'), 3000);
      } else {
        setMessage('Invalid password reset link.');
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Container>
      <Box mt={5} textAlign="center">
        <Typography variant="h4">Reset Your Password</Typography>
        
        <TextField
          label="Enter new password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        
        <TextField
          label="Confirm new password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: 2 }}
        >
          Reset Password
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

export default ResetPassword;
