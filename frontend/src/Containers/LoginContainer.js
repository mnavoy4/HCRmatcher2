import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Grid, TextField, Paper, RadioGroup, FormControlLabel, Checkbox, FormGroup, Radio, FormLabel, FormControl, Button, InputAdornment } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle, LockRounded } from '@material-ui/icons';

const loginURL = 'http://localhost:4000/users/login'

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
  },
  firstNestedGrid: {
    padding: 10
  },
  form: {
    maxWidth: 400,
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column'
  }
}));

export default function LoginContainer(props){

  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    axios.post(loginURL, data)
      .then(response => console.log(response))
      .catch(error => error)
  }
  return (
    <div>
      <Grid container className={classes.mainGridContainer}>
        <Grid item xs={12} sm={6}>
          <img
            src='https://images.fineartamerica.com/images-medium-large-5/portrait-of-a-lion-lucie-bilodeau.jpg'
            className={classes.bigSideImage}
            alt='Brand'
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          className={classes.firstNestedGrid}
          alignItems='center'
          direction='column'
          justify='space-between'
        >
          <div></div>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container justify='center'>
              <img
                src='https://static.wixstatic.com/media/206294_1e4e4cb5cc9a47a68248897bcb86c029~mv2.png/v1/fill/w_302,h_65,al_c,q_85,usm_0.66_1.00_0.01/Logo.webp'
                width={300}
                alt='Logo'
              />
            </Grid>
            <TextField
              label='Email'
              margin='normal'
              inputRef={register({ required: true })}
              name='email'
              InputProps={{ startAdornment: <InputAdornment position='start'><AccountCircle/></InputAdornment>}}
            />
            <TextField
              label='Password'
              margin='normal'
              inputRef={register({ required: true })}
              name='password'
              InputProps={{ startAdornment: <InputAdornment position='start'><LockRounded/></InputAdornment>}}
            />
            <Button
              type='submit'
              color='primary'
              variant='contained'
            >
              Login
            </Button>
            <Button style={{ marginTop: 10 }}>New User?</Button>
          </form>
          <Grid container justify='center' spacing={2}>
            <Grid item>
              <Button color='primary'>Go to about page</Button>
            </Grid>
            <Grid item>
              <Button variant='outlined'>Forgot Password?</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}