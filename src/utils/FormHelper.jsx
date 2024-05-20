import React from 'react'

export default function useForm(initialFormValues) {
  
    const [values, setValues] = React.useState(initialFormValues);

    const handleFormInputChange = (e) => {
        const {name, value} = e.target;

        setValues({
            ...values,
            [name]: value
        });
    }

    const resetForm = () => {
        setValues(initialFormValues);
    }

    return ({
        values,
        setValues,
        resetForm,
        handleFormInputChange
    })
}
