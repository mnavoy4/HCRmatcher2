import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Grid, TextField, Paper, RadioGroup, FormControlLabel, Checkbox, FormGroup, Radio, FormLabel, FormControl, Button } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1)
    }
  },
  mainGridContainer: {
    minHeight: '100vh'
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(5)
  },
  formItemPaper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(1)
  },
  h1: {
    textAlign: 'center'
  },
  bigSideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}));

export default function LoginContainer(props){

  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <div>
      <Grid container className={classes.mainGridContainer}>
        <Grid item xs={12} sm={6}>
          <img src='https://images.fineartamerica.com/images-medium-large-5/portrait-of-a-lion-lucie-bilodeau.jpg' className={classes.bigSideImage}/>
        </Grid>
        <Grid item xs={12} sm={6}>

        </Grid>
      </Grid>
    </div>
  )
}