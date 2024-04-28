import React from 'react'

export default function useForm(initialFormValues) {
  
    const [values, setValues] = React.useState(initialFormValues);

    const handleFormInputChange = (e) => {
        const {name, value} = e;

        setValues({
            ...values,
            [name]: value
        })
    }

    return ({
        values,
        setValues,
        handleFormInputChange
    })
}
