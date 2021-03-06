import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../Inspection/Others/controls/Controls";
import { useForm, Form } from '../Inspection/Others/useForm';
import * as Bikeservice from "../Inspection/Bikeservice";




const initialFValues = {
    id: 0,
    fullName: '',
    status: '',
    hireDate: new Date(),
  
}

export default function IForm() {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
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
            Bikeservice.insertEmployee(values)
            resetForm()
        }
    }

    return (
       
        <Form onSubmit={handleSubmit}>
            <Grid container>
                   <Grid item xs={7}>
                   <Controls.Input
                           name="fullName"
                           label="Block"
                           value={values.fullName}
                           onChange={handleInputChange}
                           error={errors.fullName}
                       />
                      
                       <Controls.Input
                           label="Issues"
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