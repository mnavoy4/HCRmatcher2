import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Paper, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(1)
  },
  removeButton: {
    display: 'inline-block'
  }
  // radioGroup: {
  //   justifyContent: 
  // }
}));

export default function WillingToGoWhere(){

  const { register, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'willingToGo'
  });
  const classes = useStyles();


  
  return (
    <Paper className={classes.paper}>
      <FormControl>
        <FormLabel>Where are they willing to relocate to?</FormLabel>
        <Button onClick={() => append({})}>Add Location</Button>
        {fields.map(({ id }, index) => {
          return (
            <div key={id}>
              <TextField
                inputRef={register()}
                // name='willingToGo'
                variant='outlined'
                // name={`willingToGo[${index}].location`}
                label='Location'
                defaultValue=''
              />
              <Button className={classes.removeButton} onClick={() => remove(index)}>Remove</Button>
            </div>
          )
        })}
      </FormControl>
    </Paper>

  )
}