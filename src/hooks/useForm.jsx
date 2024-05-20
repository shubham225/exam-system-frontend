import React from 'react';

function useForm(initialValues) {
    const [values, setValues] = React.useState(initialValues);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value});
    };

    const resetForm = () => {
        setValues(initialValues);
    };

    return {values, setValues, handleChange, resetForm};
}

export default useForm;