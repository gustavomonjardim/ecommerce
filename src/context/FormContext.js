import { useFormik } from 'formik';
import propTypes from 'prop-types';
import React, { createContext, useContext, useMemo, useCallback } from 'react';

const FormContext = createContext();

const FormContextProvider = ({ initialValues, validationSchema, onSubmit, children }) => {
  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    submitForm,
    setValues,
    unregisterField: removeField,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: true,
    validateOnMount: true,
  });

  const registerField = useCallback(
    field => {
      setFieldValue(field, '');
    },
    [setFieldValue]
  );

  const unregisterField = useCallback(
    field => {
      setFieldError(field, 'Campo Removido');
      setFieldValue(field, undefined);
      removeField(field);
    },
    [setFieldError, setFieldValue, removeField]
  );

  const cleanFieldError = useCallback(
    field => {
      setFieldError(field, undefined);
    },
    [setFieldError]
  );

  const validateField = useCallback(
    async field => {
      try {
        await validationSchema.validateAt(field, values);
        return true;
      } catch (err) {
        setFieldError(field, err.errors[0]);
        setFieldTouched(field, true, true);
        return false;
      }
    },
    [values, setFieldError, setFieldTouched, validationSchema]
  );

  const defaultContext = useMemo(
    () => ({
      handleChange,
      handleBlur,
      values,
      touched,
      errors,
      handleSubmit,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      registerField,
      setValues,
      unregisterField,
      validateField,
      cleanFieldError,
      submitForm,
    }),
    [
      handleChange,
      handleBlur,
      values,
      touched,
      errors,
      handleSubmit,
      setFieldValue,
      setValues,
      setFieldError,
      setFieldTouched,
      registerField,
      unregisterField,
      validateField,
      cleanFieldError,
      submitForm,
    ]
  );

  return <FormContext.Provider value={defaultContext}>{children}</FormContext.Provider>;
};

FormContextProvider.propTypes = {
  initialValues: propTypes.shape().isRequired,
  validationSchema: propTypes.shape(),
  onSubmit: propTypes.func.isRequired,
  children: propTypes.oneOfType([
    propTypes.element.isRequired,
    propTypes.arrayOf(propTypes.element.isRequired),
  ]).isRequired,
};

FormContextProvider.defaultProps = {
  validationSchema: null,
};

function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error(`useForm must be used within a FormProvider`);
  }
  return context;
}

const useField = field => {
  const form = useContext(FormContext);

  return {
    handleChange: form.handleChange(field),
    handleBlur: form.handleBlur(field),
    value: form.values[field],
    values: form.values,
    touched: form.touched[field],
    error: form.errors[field],
    handleSubmit: form.handleSubmit,
    setFieldValue: form.setFieldValue,
    setFieldTouched: form.setFieldTouched,
    registerField: form.registerField,
    unregisterField: form.unregisterField,
    setFieldError: form.setFieldError,
  };
};

export { FormContext, FormContextProvider, useForm, useField };
