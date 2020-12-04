import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Paper, RadioGroup, FormControlLabel, Checkbox, FormGroup, Radio, FormLabel, FormControl, Button } from '@material-ui/core';
import axios from 'axios';
import NavBar from '../Components/NavBar';
import * as allIndustries from '../data/industries';
import * as allSkills from '../data/skills';

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

export default function AddJobContainer(props){

  const { industries } = allIndustries.default;
  const { skills } = allSkills.default;

  const [lowEndSalary, setLowEndSalary] = useState('');
  const [highEndSalary, setHighEndSalary] = useState('');

  const { register, handleSubmit, control } = useForm()
  const classes = useStyles();

  const stringToBoolean = (string) => {
    if (string === 'true'){
      return true
    } else {
      return false
    }
  };

  const extraTagsFieldArray = useFieldArray({
    name: 'tags',
    control
  })

  const onSubmit = (data) => {
    const onlyTrueIndustries = data.industries.filter((industry) => {
      return industry.industry !== false
    });
    const onlyTrueSkills = data.skillsRequired.filter((skill) => {
      return skill.skill !== false;
    });
    const fixedRemote = stringToBoolean(data.remote);
    const fixedWillingToSponsor = stringToBoolean(data.willingToSponsor);
    const fixedCitizenshipRequired = stringToBoolean(data.citizenshipRequired);
    const fixedRelocationAssistance = stringToBoolean(data.relocationAssistance);
    let newData = {
      ...data,
      industries: onlyTrueIndustries,
      remote: fixedRemote,
      willingToSponsor: fixedWillingToSponsor,
      citizenshipRequired: fixedCitizenshipRequired,
      relocationAssistance: fixedRelocationAssistance,
      skillsRequired: onlyTrueSkills,
      salaryRange: `${lowEndSalary} - ${highEndSalary}`
    };
    axios.post(postJobURL, newData)
      .then(response => console.log(response))
      .catch(error => console.log(error))
      .then(props.history.push('/jobs'))
  }

  const handleLowEndSalaryChange = (event) => {
    setLowEndSalary(event.target.value)
  }
  const handleHighEndSalaryChange = (event) => {
    setHighEndSalary(event.target.value)
  }

  return (
    <div>
      <NavBar/>
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
                    label='Recruiter'
                    inputRef={register({ required: true, pattern: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/im })}
                    name='recruiter'
                    variant='outlined'
                  />
                  <TextField
                    label='Client Fee/Split Percentage in Whole Number'
                    inputRef={register({ required: true, pattern: /^[0-9]*$/im })}
                    name='clientFee'
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
                  <Paper className={classes.formItemPaper}>
                    <FormLabel>Salary Range</FormLabel>
                    <br></br>
                    <FormLabel>If designated salary - enter salary in both fields</FormLabel>
                    <TextField
                      label='Low End of Salary'
                      required
                      variant='outlined'
                      value={lowEndSalary}
                      onChange={handleLowEndSalaryChange}
                    />
                    <TextField
                      label='High End Salary'
                      required
                      variant='outlined'
                      value={highEndSalary}
                      onChange={handleHighEndSalaryChange}
                    />
                  </Paper>
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Job Status</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel value='Open' control={<Radio/>} label='Open'/>
                            <FormControlLabel value='Closed' control={<Radio/>} label='Closed'/>
                            <FormControlLabel value='Paused' control={<Radio/>} label='Paused'/>
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    }
                    name='status'
                    rules={{ required: true }}
                    control={control}
                    defaultValue='Open'
                  />
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Employment Type</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel value='Full Time' control={<Radio/>} label='Full Time'/>
                            <FormControlLabel value='Contract' control={<Radio/>} label='Contract'/>
                            <FormControlLabel value='Part Time' control={<Radio/>} label='Part Time'/>
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    }
                    name='employmentType'
                    rules={{ required: true }}
                    control={control}
                    defaultValue='Full Time'
                  />
                  <Paper className={classes.formItemPaper}>
                    <FormLabel>Relevant Industries</FormLabel>
                    <FormGroup>
                    {
                      industries.map((industry, index) => {
                        return (
                        <FormControlLabel key={industry} label={industry} control={<Checkbox inputRef={register} color='primary' name={`industries[${index}].industry`}/>} value={industry} />
                        )
                      })
                    }
                    </FormGroup>
                  </Paper>
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Extra Tags to Classify Candidate</FormLabel>
                          <Button onClick={() => extraTagsFieldArray.append({tag: 'Tag'})}>Add Tag</Button>
                          {extraTagsFieldArray.fields.map(({ id }, index) => {
                            return (
                              <div key={id}>
                                <TextField
                                  inputRef={register()}
                                  variant='outlined'
                                  name={`tags[${index}].tag`}
                                  label='Tag'
                                  defaultValue=''
                                />
                                <Button onClick={() => extraTagsFieldArray.remove(index)}>Remove</Button>
                              </div>
                            )
                          })}
                        </FormControl>
                      </Paper>
                    }
                    name='tags'
                    control={control}
                    defaultValue=''
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Remote Position?</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel value='true' control={<Radio/>} label='Is Remote'/>
                            <FormControlLabel value='false' control={<Radio/>} label='Is Not Remote'/>
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    }
                    name='remote'
                    rules={{ required: true }}
                    control={control}
                    defaultValue='false'
                  />
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Is Client Willing To Sponsor?</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel value='true' control={<Radio/>} label='Willing To Sponsor'/>
                            <FormControlLabel value='false' control={<Radio/>} label='Not Willing To Sponsor'/>
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    }
                    name='willingToSponsor'
                    rules={{ required: true }}
                    control={control}
                    defaultValue='true'
                  />
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Is US Citizenship Required?</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel value='true' control={<Radio/>} label='Citizenship Required'/>
                            <FormControlLabel value='false' control={<Radio/>} label='Citizenship Not Required'/>
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    }
                    name='citizenshipRequired'
                    rules={{ required: true }}
                    control={control}
                    defaultValue='false'
                  />
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Is Relocation Assistance Offered</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel value='true' control={<Radio/>} label='Yes Relo Is Offered'/>
                            <FormControlLabel value='false' control={<Radio/>} label='No Relo Is Not Offered'/>
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    }
                    name='relocationAssistance'
                    rules={{ required: true }}
                    control={control}
                    defaultValue='false'
                  />
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Highest Level of Education Required</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel value='None' control={<Radio/>} label='None'/>
                            <FormControlLabel value='Associates Degree' control={<Radio/>} label='Associates Degree'/>
                            <FormControlLabel value='Bachelors' control={<Radio/>} label='Bachelors'/>
                            <FormControlLabel value='Masters' control={<Radio/>} label='Masters'/>
                            <FormControlLabel value='PhD' control={<Radio/>} label='PhD'/>
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    }
                    name='degreesRequired'
                    rules={{ required: true }}
                    control={control}
                    defaultValue='None'
                  />
                  <Paper className={classes.formItemPaper}>
                    <FormLabel>Skills Required</FormLabel>
                    <FormGroup>
                    {
                      skills.map((skill, index) => {
                        return (
                        <FormControlLabel key={skill} label={skill} control={<Checkbox inputRef={register} color='primary' name={`skillsRequired[${index}].skill`}/>} value={skill} />
                        )
                      })
                    }
                    </FormGroup>
                  </Paper>
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