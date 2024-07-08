import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../redux/actions'
import { ArtTextField } from '../components/TextField'
import { ArtButton } from '../components/Button';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loginUser
  } = bindActionCreators(actionCreators, dispatch)


  //Email Validation
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false)
  const handleEmailAddress = (value: string) => {
    setEmailError(false)
    setEmail(value)
  }

  const validatedEmailAddress = (value: string) => {
    const EMAIL_REGEXP =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const emailRegExp = new RegExp(EMAIL_REGEXP)
    const trimmedEmail = value ? value.trim() : value
    const isValidEmail =
      trimmedEmail?.length > 0 ? emailRegExp.test(trimmedEmail) : true
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

  const handleSubmit = () => {
    loginUser(email, password, navigate);
  };

  const disableBtn = email?.length === 0 || password?.length === 0 ||
    emailError || pwdError;

  return (
    <div className='form-wrapper'>
      <div className='login-reg-form'>
        <h2>Login to your Account</h2>
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
          helperText={'Please enter valid Email Address'}
          onChange={(e: { target: { value: string; }; }) => handlePassword(e.target.value)}
          onBlur={(e: { target: { value: string } }) =>
            validatePassword(e.target.value)
          }
          className={''}
          required={true}
          disabled={undefined}
          error={undefined}
        />

        <div className='action-button'>
          <ArtButton
            className={''}
            size={'medium'}
            variant="contained"
            onClick={() => handleSubmit()}
            buttonText={'Login'}
            spinner={false}
            disabled={disableBtn}
          />
        </div>
        <div className='not-registered'>
          <p>
            Not Registered? {' '}
            <span
              className='register-now'
              onClick={() => navigate('/register')}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
