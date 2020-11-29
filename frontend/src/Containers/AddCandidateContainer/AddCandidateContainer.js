import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Paper, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl, Button } from '@material-ui/core';
// import RemoteOnlyRadios from '../../Components/RemoteOnlyRadios';
// import OpenToRelocationRadios from '../../Components/OpenToRelocationRadios';
// import WillingToGoWhere from '../../Components/WillingToGoWhere';
// import usCitizenRadios from '../../Components/UsCitizenRadios'
// import ClearanceRadios from '../../Components/ClearanceRadios';

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
  radiosPaper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(1)
  },
  h1: {
    textAlign: 'center'
  }
}));

export default function AddCandidateContainer(){

  const { register, handleSubmit, control } = useForm()
  const onSubmit = (data) => console.log(data);
  const classes = useStyles();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'willingToGo'
  });

  return (
    <div>
      <header className='add-candidates-header'>
        <h1 className={classes.h1}>Add Candidate</h1>
      </header>
      <main>
        <div>
          <Paper className={classes.paper}>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
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
                    as={
                      <Paper className={classes.radiosPaper}>
                        <FormControl>
                          <FormLabel>US Citizen?</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel value='true' control={<Radio/>} label='Citizen'/>
                            <FormControlLabel value='false' control={<Radio/>} label='Not a citizen'/>
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    }
                    name='usCitizen'
                    rules={{ required: true }}
                    control={control}
                    defaultValue='true'
                  />
                  <Controller
                    as={
                      <Paper className={classes.radiosPaper}>
                        <FormControl>
                          <FormLabel>Only wants remote position?</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel value='true' control={<Radio/>} label='Wants remote position only'/>
                            <FormControlLabel value='false' control={<Radio/>} label='Open to non-remote position'/>
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    }
                    name='wantsRemote'
                    rules={{ required: true }}
                    control={control}
                    defaultValue='false'
                  />
                  <Controller
                    as={
                      <Paper className={classes.radiosPaper}>
                        <FormControl>
                          <FormLabel>Open to Relocation?</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel value='true' control={<Radio/>} label='Open to relocation'/>
                            <FormControlLabel value='false' control={<Radio/>} label='Not willing to relocate'/>
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    }
                    name='openToRelocation'
                    rules={{ required: true }}
                    control={control}
                    defaultValue='true'
                  />
                  <Controller
                    as={
                      <Paper className={classes.radiosPaper}>
                        <FormControl>
                          <FormLabel>Where are they willing to relocate to?</FormLabel>
                          <Button onClick={() => append({})}>Add Location</Button>
                          {fields.map(({ id }, index) => {
                            return (
                              <div key={id}>
                                <TextField
                                  inputRef={register()}
                                  variant='outlined'
                                  name={`willingToGo[${index}].location`}
                                  label='Location'
                                  defaultValue=''
                                />
                                <Button onClick={() => remove(index)}>Remove</Button>
                              </div>
                            )
                          })}
                        </FormControl>
                      </Paper>
                    }
                    name='willingToGo'
                    control={control}
                    defaultValue=''
                  />
                  <Controller
                    as={
                      <Paper className={classes.radiosPaper}>
                        <FormControl>
                          <FormLabel>Clearance?</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel value='None' control={<Radio/>} label='None'/>
                            <FormControlLabel value='Public Trust' control={<Radio/>} label='Public Trust'/>
                            <FormControlLabel value='Confidential' control={<Radio/>} label='Confidential'/>
                            <FormControlLabel value='Secret' control={<Radio/>} label='Secret'/>
                            <FormControlLabel value='Top Secret' control={<Radio/>} label='Top Secret'/>
                            <FormControlLabel value='TS/SCI' control={<Radio/>} label='TS/SCI'/>
                          </RadioGroup>
                        </FormControl>
                      </Paper>}
                    name='clearance'
                    defaultValue='None'
                    rules={{ required: true }}
                    control={control}
                  />
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