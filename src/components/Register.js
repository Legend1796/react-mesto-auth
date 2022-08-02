import React from 'react';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import Form from './Form';

function Register({ onRegister }) {
  const { values, handleChange, errors, isValid, resetErrors } = useFormAndValidation({})

  function handleSubmit(e) {
    e.preventDefault();
    resetErrors({ email: '', password: '' });
    onRegister(values);
  }

  return (
    <div className="login">
      <p className="login__title">Регистрация</p>
      <Form onSubmit={handleSubmit} name="login" isActiveSubmitButton={isValid} submitButtonText="Зарегистрироваться" >
        <input className="login__input login__input_type_email" id="email" name="email" type="email" value={values.email || ''} onChange={handleChange} placeholder="Email" required />
        <span className={`login__input-error url-input-error ${!isValid ? 'login__input-error_active popup__input_type_error' : ''}`}>{errors.email}</span>
        <input className="login__input login__input_type_password" id="password" name="password" type="password" value={values.password || ''} onChange={handleChange} placeholder="Пароль" minLength="6" maxLength="20" required />
        <span className={`login__input-error password-input-error ${!isValid ? 'login__input-error_active popup__input_type_error' : ''}`}>{errors.password}</span>
      </Form>
      <div className="login__signup">
        <p className="login__signup-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="login__link">Войти</Link>
      </div>
    </div>
  )
}

export default Register;