import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Paper } from '@material-ui/core';

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
  }
}));

export default function UsCitizenRadiosRadios(){

  const classes = useStyles();
  
  return (
    <Paper className={classes.paper}>
      <FormControl>
        <FormLabel>US Citizen?</FormLabel>
        <RadioGroup row>
          <FormControlLabel value='true' control={<Radio/>} label='Citizen'/>
          <FormControlLabel value='false' control={<Radio/>} label='Not a citizen'/>
        </RadioGroup>
      </FormControl>
    </Paper>
  )
}