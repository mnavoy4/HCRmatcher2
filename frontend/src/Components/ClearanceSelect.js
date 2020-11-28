import React from 'react';
import { makeStyles, InputLabel, MenuItem, Select, Paper, FormControl, FormLabel } from '@material-ui/core';

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

export default function ClearanceSelect(){

  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <FormControl>
        <FormLabel>Clearance?</FormLabel>
        <Select defaultValue='None'>
          <MenuItem value='None'>None</MenuItem>
          <MenuItem value='Public Trust'>Public Trust</MenuItem>
          <MenuItem value='Confidential'>Confidential</MenuItem>
          <MenuItem value='Secret'>Secret</MenuItem>
          <MenuItem value='Top Secret'>Top Secret</MenuItem>
          <MenuItem value='TS/SCI'>TS/SCI</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  )
}