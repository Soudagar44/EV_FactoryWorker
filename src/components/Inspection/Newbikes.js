import React, { useState, useEffect } from 'react'
import { Grid, makeStyles, TextField } from '@material-ui/core';
import {useForm,Form} from './Others/useForm'
import Controls from './Others/controls/Controls'
import * as Bikeservice from "./Bikeservice";


const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    status: '',
    hireDate: new Date(),
    
}

export default function Newbikes(props) {
    const { addOrEdit, recordForEdit } = props
  
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
        temp.email = fieldValues.email ? "" : "This field is required."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('status' in fieldValues)
            temp.status = fieldValues.status ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

   
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
       
     <Form onSubmit={handleSubmit}>
         <Grid container>
                <Grid item xs={6}>
                <Controls.Input
                        name="fullName"
                        label="Model"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    
                    <Controls.Input
                        label="Manager Name"
                        name="email"                      
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <Controls.DatePicker
                        label="Start Date"
                        name="hireDate"                      
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Status"
                        name="status"
                        value={values.status}
                        onChange={handleInputChange}
                        error={errors.status}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                           color="default"
                           onClick={resetForm}
                            />
                    </div>

                    </Grid>
                </Grid>
                </Form>
        
           
    
    )
}