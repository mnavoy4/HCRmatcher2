import React from 'react';
import { makeStyles, Radio, RadioGroup, Paper, FormControl, FormLabel, FormControlLabel } from '@material-ui/core';

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

export default function ClearanceRadios(){

  const classes = useStyles();

  return (
    // <Paper className={classes.paper}>
    //   <FormControl>
        // <FormLabel>Clearance?</FormLabel>
        <RadioGroup row>
          <FormControlLabel value='None' control={<Radio/>} label='None'/>
          <FormControlLabel value='Public Trust' control={<Radio/>} label='Public Trust'/>
          <FormControlLabel value='Confidential' control={<Radio/>} label='Confidential'/>
          <FormControlLabel value='Secret' control={<Radio/>} label='Secret'/>
          <FormControlLabel value='Top Secret' control={<Radio/>} label='Top Secret'/>
          <FormControlLabel value='TS/SCI' control={<Radio/>} label='TS/SCI'/>
        </RadioGroup>
    //   </FormControl>
    // </Paper>
  )
}