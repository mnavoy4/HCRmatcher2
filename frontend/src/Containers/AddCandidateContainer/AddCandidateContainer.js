import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Input, Grid, Button, Container, Checkbox, TextField, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(5)
  },
  h1: {
    textAlign: 'center'
  }
}));

export default function AddCandidateContainer(){

  const { register, handleSubmit, control } = useForm()
  const onSubmit = (data) => console.log(data);
  const classes = useStyles();

  return (
    <div>
      <header className='add-candidates-header'>
        <h1 className={classes.h1}>Add Candidate</h1>
      </header>
      <main>
        <div>
          <Paper className={classes.paper}>
            <form className={classes.root}>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    // className={classes.paper}
                    label='Full Name'
                    inputRef={register({ required: true, pattern: /^[A-Za-z]+$/i })}
                    required
                    name='name'
                    variant='outlined'
                  />
                  <TextField
                    label='Email'
                    inputRef={register({ required: true, pattern: /^[A-Za-z]+$/i })}
                    required
                    name='email'
                    variant='outlined'
                  />
                  <TextField
                    label='Phone Number'
                    inputRef={register({ required: true, pattern: /^[A-Za-z]+$/i })}
                    required
                    name='phoneNumber'
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={6}>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </div>

      </main>
    </div>
  )
}