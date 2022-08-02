
import { useState } from 'react';

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('.popup__form').checkValidity());
  }

  function resetErrors(data) {
    setValues(data);
    setErrors({});
    setIsValid(true);
  }

  return { values, handleChange, errors, isValid, resetErrors, setValues };
}