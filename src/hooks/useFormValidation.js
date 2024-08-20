"use client"

import { useState } from "react";

const useFormValidation = (initialValues, validationRules, onSubmit) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const validateField = (fieldName, value) => {
        const rules = validationRules[fieldName];
        if (rules) {
            for (const rule of rules) {
                const { validate, message } = rule;
                if (!validate(value)) {
                    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: message }));
                    return;
                }
            }
        }
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: null }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
        // validateField(name, value);
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        validateField(name, value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = {};
        for (const fieldName in validationRules) {
            if (Object.hasOwnProperty.call(validationRules, fieldName)) {
                const value = values[fieldName];
                validateField(fieldName, value);
                if (errors[fieldName]) {
                    validationErrors[fieldName] = errors[fieldName];
                }
            }
        }

        if (Object.keys(validationErrors).length === 0) {
            onSubmit(values);
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    return {
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
    };
};

export default useFormValidation;