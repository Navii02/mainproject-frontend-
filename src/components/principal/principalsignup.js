// PrincipalSignup.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import '../signup.css';

function usePrincipalSignup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    showPassword: false,
    showRepeatPassword: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    repeatPassword: false,
    fetchError: false,
    fetchErrorMsg: '',
  });

  const handleChange = (fieldName) => (event) => {
    const currValue = event.target.value;
    switch (fieldName) {
      case 'name':
        // Handle 'name' validation if needed
        break;
      case 'email':
        validator.isEmail(currValue)
          ? setErrors({ ...errors, email: false })
          : setErrors({ ...errors, email: true });
        break;
      case 'password':
        // Include your password validation logic here
        break;
      case 'repeatPassword':
        currValue === values.password
          ? setErrors({ ...errors, repeatPassword: false })
          : setErrors({ ...errors, repeatPassword: true });
        break;
      default:
    }
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const handleShowPassword = (showPasswordField) => {
    setValues({
      ...values,
      [showPasswordField]: !values[showPasswordField],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('/api/principalregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
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

      // Handle successful registration (redirect or show a success message)
      console.log(data);

      setValues({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        showPassword: false,
        showRepeatPassword: false,
      });
    } catch (error) {
      setErrors({
        ...errors,
        fetchError: true,
        fetchErrorMsg: 'There was a problem with our server, please try again later',
      });
    }
  };

  return { values, errors, handleChange, handleShowPassword, handleSubmit };
}

function PrincipalSignup() {
  const { values, errors, handleChange, handleShowPassword, handleSubmit } = usePrincipalSignup();

  return (
    <div className='signup-background-image'>
      <div className="signup-container">
        <div className="signup-form">
          <div className='signup-header-box'>
            <div className='signup-header'>
              <div className="signup-avatar">
                <img
                  src={process.env.PUBLIC_URL + '/images/icon.png'}
                  alt="Avatar"
                  style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                />
              </div>
              <h2>Register a new account</h2>
            </div>
          </div>
          <form className='signup-fill' onSubmit={handleSubmit} noValidate>
            <input
              type='text'
              placeholder='Name'
              value={values.name}
              onChange={handleChange('name')}
              className={errors.name ? 'signup-input signup-error' : 'signup-input'}
            />
            <input
              type='email'
              placeholder='Email'
              value={values.email}
              onChange={handleChange('email')}
              className={errors.email ? 'signup-input signup-error' : 'signup-input'}
            />
            <div className='signup-password-field'>
              <div className="password-input-container">
                <input
                  id="password-field"
                  type={values.showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  value={values.password}
                  onChange={handleChange('password')}
                  className={errors.password ? 'signup-input signup-error' : 'signup-input'}
                />
                <span className="eye-icon" onClick={() => handleShowPassword('showPassword')}>
                  {values.showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                </span>
              </div>
              <div className="password-input-container">
                <input
                  id="repeat-password-field"
                  type={values.showRepeatPassword ? 'text' : 'password'}
                  placeholder='Repeat password'
                  value={values.repeatPassword}
                  onChange={handleChange('repeatPassword')}
                  className={errors.repeatPassword ? 'signup-input signup-error' : 'signup-input'}
                />
                <span className="eye-icon" onClick={() => handleShowPassword('showRepeatPassword')}>
                  {values.showRepeatPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                </span>
              </div>
            </div>
            <div className='signup-button-container'>
              <button type='submit' className="signup-button">
                Sign me up!
              </button>
            </div>
            {errors.fetchError && (
              <p className="signup-error-text">{errors.fetchErrorMsg}</p>
            )}
            <div className="login-link">
              <p>Already have an account? <Link to="/principallogin">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PrincipalSignup;