import { useState } from 'react';

const useForm = ({
  initialValues, fields, handleSubmit: _handleSubmit, validate,
}) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [isFormDirty, setFormDirty] = useState(false);

  const handleSubmit = (event, name) => {
    if (event) event.preventDefault();
    setFormDirty(true);
    const validationErrors = validate({ values }) || {};
    if (!Object.keys(validationErrors).length) {
      _handleSubmit(values, name);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (event) => {
    const { target: { name } } = event;
    if (event.persist) {
      event.persist();
    }
    const updatedValues = fields[name].handleChange(event, values);
    setValues(updatedValues);
    if (isFormDirty) {
      const validationErrors = validate({ values: updatedValues }) || {};
      setErrors(validationErrors);
    }
  };

  const handleToggle = (name) => (value) => {
    const updatedValues = fields[name].handleToggle({ name, value }, values);
    setValues(updatedValues);
    if (isFormDirty) {
      const validationErrors = validate({ values: updatedValues }) || {};
      setErrors(validationErrors);
    }
  };

  const handleSelect = (name) => (value) => {
    const updatedValues = fields[name].handleSelect({ name, value }, values);
    setValues(updatedValues);
    if (isFormDirty) {
      const validationErrors = validate({ values: updatedValues }) || {};
      setErrors(validationErrors);
    }
  };

  const handleBlur = () => {
    if (isFormDirty) {
      const validationErrors = validate({ values }) || {};
      setErrors(validationErrors);
    }
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  return {
    values,
    setValues,
    reset: () => {
      setFormDirty(false);
      setErrors({});
      setValues(initialValues);
    },
    isFormDirty,
    errors,
    events: {
      onSubmit: handleSubmit,
      onBlur: handleBlur,
      onChange: handleChange,
      onToggle: handleToggle,
      onKeyUp: handleKeyUp,
      onSelect: handleSelect,
    },
  };
};

export default useForm;
