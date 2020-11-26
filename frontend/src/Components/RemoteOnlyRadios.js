import React from 'react';
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
  // radioGroup: {
  //   justifyContent: 
  // }
}));

export default function RemoteOnlyRadios(){

  const classes = useStyles();
  
  return (
    <Paper className={classes.paper}>
      <FormControl>
        <FormLabel>Only wants remote position?</FormLabel>
        <RadioGroup row>
          <FormControlLabel value='true' control={<Radio/>} label='Wants remote position only'/>
          <FormControlLabel value='false' control={<Radio/>} label='Open to non-remote position'/>
        </RadioGroup>
      </FormControl>
    </Paper>

  )
}