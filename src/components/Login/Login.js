import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// const emailReducer = (state, action) => {
//   if (action.type == 'USER_INPUT') {
//     return { value: action.val, isValid: action.val.includes('@') };
//   }
//   if (action.type == 'INPUT_BLUR') {
//     return { value: state.value, isValid: state.isValid };
//   }
// };

// const passwordReducer = (state, action) => {
//   if (action.type == 'USER_INPUT') {
//     return { value: action.val, isValid: action.val.trim().length > 6 };
//   }
//   if (action.type == 'INPUT_BLUR') {
//     return { value: state.value, isValid: state.isValid };
//   }
// };

const stateReducer = (state, action) => {
  // console.log('previous state:::::', state, 'action:::::: ', action);
  if (action.type == 'USER_INPUT') {
    // console.log('value: ', action.val, 'isValid: ', action.val.includes('@'));
    return {
      ...state,
      emailValue: action.val,
      emailIsValid: action.val.includes('@'),
    };
  }
  if (action.type == 'USER_INPUT_BLUR') {
    return {
      ...state,
      emailValue: state.emailValue,
      emailIsValid: state.emailIsValid,
    };
  }
  if (action.type == 'PASSWORD_INPUT') {
    return {
      ...state,
      passwordValue: action.val,
      passwordIsValid: action.val.trim().length > 6,
    };
  }
  if (action.type == 'PASSWORD_INPUT_BLUR') {
    return {
      ...state,
      passwordValue: state.passwordValue,
      passwordIsValid: state.passwordIsValid,
    };
  }
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  // const [emailState, dispatchEmail] = useReducer(emailReducer, {
  //   value: '',
  //   isValid: null,
  // });
  // const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
  //   value: '',
  //   isValid: null,
  // });

  const [states, dispatchState] = useReducer(stateReducer, {
    emailValue: '',
    emailIsValid: null,
    passwordValue: '',
    passwordIsValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity also changing state');
      setFormIsValid(states.emailIsValid && states.passwordIsValid);
    }, 500);

    return () => {
      console.log('CLEARED');
      clearInterval(identifier);
    };
  }, [states.emailIsValid, states.passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchState({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchState({ type: 'PASSWORD_INPUT', val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchState({ type: 'USER_INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchState({ type: 'PASSWORD_INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(states.emailValue, states.passwordValue);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            states.emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={states.emailValue}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            states.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={states.passwordValue}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
