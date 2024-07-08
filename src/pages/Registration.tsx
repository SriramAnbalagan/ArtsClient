import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../redux/actions'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { ArtTextField } from '../components/TextField';
import { ArtButton } from '../components/Button';

const Registration: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    registerUser
  } = bindActionCreators(actionCreators, dispatch)

  const handleSubmit = () => {
    registerUser(name, email, password, role, navigate);
    setName('');
    setEmail('');
    setPassword('');
  };

  //Role
  const [role, setRole] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value
    setRole(selectedValue);
  };

  //Name Validation
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false)
  const handleName = (value: string) => {
    setNameError(false)
    setName(value)
  }

  const validateName = (value: string) => {
    const isValidName = value?.length > 0 ? true : false
    if (!isValidName) {
      setNameError(true)
    } else {
      setNameError(false)
    }
  }

  //Email Validation
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false)
  const handleEmailAddress = (value: string) => {
    setEmailError(false)
    const trimmedEmail = value ? value.trim() : value
    setEmail(trimmedEmail)
  }

  const validatedEmailAddress = (value: string) => {
    const EMAIL_REGEXP =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const emailRegExp = new RegExp(EMAIL_REGEXP)
    const trimmedEmail = value ? value.trim() : value
    const isValidEmail =
      trimmedEmail?.length === 0 ? false : emailRegExp.test(trimmedEmail)
    if (!isValidEmail) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }

  //Password Validation
  const [password, setPassword] = useState('');
  const [pwdError, setPwdError] = useState(false)
  const handlePassword = (value: string) => {
    setPwdError(false)
    const validText = value ? value.trim() : value
    setPassword(validText)
  }

  const validatePassword = (value: string) => {
    const isValidPwd = value?.length > 0 ? true : false
    if (!isValidPwd) {
      setPwdError(true)
    } else {
      setPwdError(false)
    }
  }

  const disableBtn = role?.length === 0 || name?.length === 0 || email?.length === 0 || password?.length === 0 || 
  nameError || emailError || pwdError;

  return (
    <div className='form-wrapper'>
      <div className='login-reg-form'>
        <h2>Create New Account</h2>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={role}
            onChange={handleChange}
            className='radio-btn-wrapper'
          >
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            <FormControlLabel value="employee" control={<Radio />} label="Employee" />
          </RadioGroup>
        </FormControl>
        <ArtTextField
          type={'text'}
          label={'Name'}
          placeholder={'Name'}
          value={name}
          error={nameError}
          helperText={'Please enter valid name'}
          onChange={(e: { target: { value: string; }; }) => handleName(e.target.value)}
          onBlur={(e: { target: { value: string } }) =>
            validateName(e.target.value)
          }
          className={''}
          required={true}
          disabled={undefined}
        />

        <ArtTextField
          type={'email'}
          label={'Email Address'}
          placeholder={'Email Address'}
          value={email}
          error={emailError}
          helperText={'Please enter valid Email Address'}
          onChange={(e: { target: { value: string; }; }) => handleEmailAddress(e.target.value)}
          onBlur={(e: { target: { value: string } }) =>
            validatedEmailAddress(e.target.value)
          }
          className={''}
          required={true}
          disabled={undefined}
        />

        <ArtTextField
          type={'password'}
          label={'Password'}
          placeholder={'Password'}
          value={password}
          error={pwdError}
          helperText={'Please enter valid Password'}
          onChange={(e: { target: { value: string; }; }) => handlePassword(e.target.value)}
          onBlur={(e: { target: { value: string } }) =>
            validatePassword(e.target.value)
          }
          className={''}
          required={true}
          disabled={undefined}
        />

        <div className='action-button'>
          <ArtButton
            className={''}
            size={'medium'}
            variant="contained"
            onClick={() => handleSubmit()}
            buttonText={'Register'}
            spinner={false}
            disabled={disableBtn}
          />
        </div>
        <div className='not-registered'>
          <p>
            Already Registered? {' '}
            <span
              className='register-now'
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
