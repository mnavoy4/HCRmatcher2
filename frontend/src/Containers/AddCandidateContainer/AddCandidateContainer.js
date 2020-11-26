import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Input, Grid, Button, Container, Checkbox, TextField, Paper } from '@material-ui/core';
import RemoteOnlyRadios from '../../Components/RemoteOnlyRadios';
import OpenToRelocationRadios from '../../Components/OpenToRelocationRadios';

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
                    label='Full Name'
                    inputRef={register({ required: true, pattern: /^([a-zA-Z'-.]+ [a-zA-Z'-.]+)$/gm })}
                    required
                    name='name'
                    variant='outlined'
                  />
                  <TextField
                    label='Email'
                    inputRef={register({ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                    required
                    name='email'
                    variant='outlined'
                  />
                  <TextField
                    label='Phone Number'
                    inputRef={register({ required: true, pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im })}
                    required
                    name='phoneNumber'
                    variant='outlined'
                  />
                  <TextField
                    label='City'
                    inputRef={register({ required: true, pattern: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/im })}
                    required
                    name='city'
                    variant='outlined'
                  />
                  <TextField
                    label='State'
                    inputRef={register({ required: true, pattern: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/im })}
                    required
                    name='state'
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    as={RemoteOnlyRadios}
                    name='wantsRemote'
                    rules={{ required: true }}
                    control={control}
                  />
                  <Controller
                    as={OpenToRelocationRadios}
                    name='openToRelocation'
                    rules={{ required: true }}
                    control={control}
                    inputRef='someRef'
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </div>

      </main>
    </div>
  )
}