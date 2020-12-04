import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Paper, RadioGroup, FormControlLabel, Checkbox, FormGroup, Radio, FormLabel, FormControl, Button } from '@material-ui/core';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiFormControl-root': {
      width: '95%',
      margin: theme.spacing(1)
    }
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
  }
}));

const postJobURL = 'http://localhost:5000/jobs/add'

export default function AddJobContainer(){

  const { register, handleSubmit, control } = useForm()
  const classes = useStyles();

  const onSubmit = (data) => console.log(data)

  return (
    <div>
      <header className='add-job-header'>
        <h1 className={classes.h1}>Add Job</h1>
      </header>
      <main>
        <div>
          <Paper className={classes.paper}>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    label='Job Title'
                    inputRef={register({ required: true, pattern: /^([a-zA-Z'-.]+ [a-zA-Z'-.]+)$/gm })}
                    required
                    name='title'
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
                  <TextField
                    label='Client If Known'
                    inputRef={register({ required: true, pattern: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/im })}
                    name='client'
                    variant='outlined'
                  />
                  <TextField
                    label='Job Description'
                    inputRef={register({ required: true })}
                    multiline
                    required
                    name='jobDescription'
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={6}>

                </Grid>
                <input type='submit'/>
              </Grid>
            </form>
          </Paper>
        </div>
      </main>
    </div>
  )
}