import { useFormik } from 'formik';
import propTypes from 'prop-types';
import React, { createContext, useContext, useMemo } from 'react';

const FormContext = createContext();

const FormProvider = ({ initialValues, validationSchema, onSubmit, children }) => {
  const { handleChange, handleBlur, values, touched, errors, submitForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: true,
    validateOnMount: true,
  });

  const defaultContext = useMemo(
    () => ({
      handleChange,
      handleBlur,
      values,
      touched,
      errors,
      submitForm,
    }),
    [handleChange, handleBlur, values, touched, errors, submitForm]
  );

  return <FormContext.Provider value={defaultContext}>{children}</FormContext.Provider>;
};

FormProvider.propTypes = {
  initialValues: propTypes.shape().isRequired,
  validationSchema: propTypes.shape(),
  onSubmit: propTypes.func.isRequired,
  children: propTypes.oneOfType([
    propTypes.element.isRequired,
    propTypes.arrayOf(propTypes.element.isRequired),
  ]).isRequired,
};

FormProvider.defaultProps = {
  validationSchema: null,
};

function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error(`useForm must be used within a FormProvider`);
  }
  return context;
}

export { FormProvider, useForm };
