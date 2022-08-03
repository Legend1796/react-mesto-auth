import React from 'react';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import Form from './Form';

function Login({ onLoginIn }) {

  const { values, handleChange, errors, isValid, resetErrors } = useFormAndValidation({})

  function handleSubmit(e) {
    e.preventDefault();
    onLoginIn(values);
  }

  React.useEffect(() => {
    resetErrors({ email: '', password: '' });
  }, []);

  return (
    <div className="login">
      <p className="login__title">Вход</p>
      <Form onSubmit={handleSubmit} name="login" isActiveSubmitButton={isValid} submitButtonText="Войти" >
        <input className="login__input login__input_type_email" id="email" name="email" type="email" value={values.email || ''} onChange={handleChange} placeholder="Email" required />
        <span className={`login__input-error url-input-error ${!isValid ? 'login__input-error_active popup__input_type_error' : ''}`}>{errors.email}</span>
        <input className="login__input login__input_type_password" id="password" name="password" type="password" value={values.password || ''} onChange={handleChange} placeholder="Пароль" minLength="6" maxLength="20" required />
        <span className={`login__input-error password-input-error ${!isValid ? 'login__input-error_active popup__input_type_error' : ''}`}>{errors.password}</span>
      </Form>
    </div >
  )
}

export default Login;