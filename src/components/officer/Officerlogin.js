// OfficerLogin.jsx
import React, { useState, useContext } from 'react';
import validator from 'validator';
import { regexPassword } from '../../utils';
import {
  Paper,
  Container,
  Stack,
  Button,
  Box,
  Divider,
  Avatar,
  TextField,
  FilledInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Face as FaceIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import theme from '../theme';
import { UserContext } from '../../App';

function OfficerLogin() {
  const { updateUserSession } = useContext(UserContext);

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    fetchError: false,
    fetchErrorMsg: '',
  });

  const handleChange = (fieldName) => (event) => {
    const currValue = event.target.value;
    let isCorrectValue =
      fieldName === 'email'
        ? validator.isEmail(currValue)
        : regexPassword.test(currValue);

    isCorrectValue
      ? setErrors({ ...errors, [fieldName]: false })
      : setErrors({ ...errors, [fieldName]: true });

    setValues({ ...values, [fieldName]: event.target.value });
  };

  const handleShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('/api/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        return setErrors({
          ...errors,
          fetchError: true,
          fetchErrorMsg: error.msg,
        });
      }

      const data = await res.json();

      if (data) {
        localStorage.setItem('token', data);

        // Update user session
        updateUserSession({
          email: values.email,
          role: 'admin', // Assuming the role for admin
        });

        window.location.href = '/office';
      } else {
        alert('Login failed');
        window.location.href = '/officersignup';
      }

      setErrors({
        ...errors,
        fetchError: true,
        fetchErrorMsg: data.msg,
      });
      setValues({
        email: '',
        password: '',
        showPassword: false,
      });
      return;
    } catch (error) {
      setErrors({
        ...errors,
        fetchError: true,
        fetchErrorMsg: 'There was a problem with our server, please try again later',
      });
    }
  };

  return (
    <>
      <Container sx={{ marginTop: 'calc(90vh - 40%)' }} maxWidth='xs'>
        <Paper elevation={10}>
          <Container
            maxWidth='sm'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '20px',
            }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.palette.primary.main,
                boxShadow: '0px 0px 8px rgba(153,153,167,1.99)',
              }}>
              <FaceIcon sx={{ fontSize: 70 }} />
            </Avatar>
            <h2>Admin</h2>
          </Container>
          <Stack
            component='form'
            onSubmit={handleSubmit}
            noValidate
            spacing={6}
            sx={{ bgcolor: '#f6f6f7', padding: '40px' }}>
            <TextField
              variant='filled'
              type='email'
              label='Email'
              value={values.email}
              onChange={handleChange('email')}
              error={errors.email}
              helperText={errors.email && 'Please insert a valid email address'}
            />

            <FormControl variant='filled'>
              <InputLabel htmlFor='password-field'>Password</InputLabel>
              <FilledInput
                id='password-field'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                error={errors.password}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleShowPassword}
                      edge='end'>
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Button
                variant='contained'
                size='large'
                type='submit'
                disabled={errors.email || errors.password}
                sx={{
                  minWidth: '70%',
                }}>
                Login
              </Button>
            </Box>
            {errors.fetchError && (
              <FormHelperText error>{errors.fetchErrorMsg}</FormHelperText>
            )}
            <Divider />
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default OfficerLogin;


