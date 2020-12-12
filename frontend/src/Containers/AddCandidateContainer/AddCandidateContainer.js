import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Paper, RadioGroup, FormControlLabel, Checkbox, FormGroup, Radio, FormLabel, FormControl, Button } from '@material-ui/core';
import * as allIndustries from '../../data/industries';
import * as allSkills from '../../data/skills';
import Select from 'react-select';
import axios from 'axios';
import NavBar from '../../Components/NavBar';

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

const postCandidateURL = 'http://localhost:5000/candidates/add';
const jobsURL = 'http://localhost:5000/jobs';

export default function AddCandidateContainer(props){

  const [jobs, setJobs] = useState([]);

  const { industries } = allIndustries.default;
  const { skills } = allSkills.default;

  const { register, handleSubmit, control } = useForm()
  const classes = useStyles();
  const willingToGoFieldArray = useFieldArray({
    control,
    name: 'willingToGo'
  });
  const companiesWorkedForFieldArray = useFieldArray({
    name: 'companiesWorkedFor',
    control
  })
  const extraTagsFieldArray = useFieldArray({
    name: 'tags',
    control
  })
  const certificationsFieldArray = useFieldArray({
    name: 'certifications',
    control
  })
  const jobTitlesFieldArray = useFieldArray({
    name: 'jobTitles',
    control
  })
  const degreesFieldArray = useFieldArray({
    name: 'degrees',
    control
  })

  const stringToBoolean = (string) => {
    if (string === 'true'){
      return true
    } else {
      return false
    }
  }

  const onSubmit = async (data) => {
    const onlyTrueSkills = data.skills.filter((skill) => {
      return skill.skill !== false;
    });
    const onlyTrueIndustriesWorkedIn = data.industriesWorkedIn.filter((industry) => {
      return industry.industry !== false
    });
    const fixedCurrentSalary = parseInt(data.currentSalary);
    const fixedOpenToRelocation = stringToBoolean(data.openToRelocation);
    const fixedStartupExperience = stringToBoolean(data.startupExperience);
    const fixedUsCitizen = stringToBoolean(data.usCitizen);
    const fixedWantsRemote = stringToBoolean(data.wantsRemote);

    let newData = {
      ...data,
      skills: onlyTrueSkills,
      industriesWorkedIn: onlyTrueIndustriesWorkedIn,
      currentSalary: fixedCurrentSalary,
      openToRelocation: fixedOpenToRelocation,
      startupExperience: fixedStartupExperience,
      usCitizen: fixedUsCitizen,
      wantsRemote: fixedWantsRemote
    }
    await axios.post(postCandidateURL, newData)
      .then(response => console.log(response))
      .catch((error) => console.log(error))
      // .then(props.history.push('/'))

  };

  useEffect(() => {
    const fetchJobs = async () => {
      const result = await axios(jobsURL)
      setJobs(result.data)
    }
    fetchJobs();
  }, []);

  let selectOptions = []
  jobs.map(job => {
    selectOptions.push({ value: job._id, label: job.title })
  })

  return (
    <div>
      <NavBar/>
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
                    inputRef={register({
                      required: true,
                      // pattern: /^([a-zA-Z'-.]+ [a-zA-Z'-.]+)$/gm
                    })}
                    required
                    name='name'
                    variant='outlined'
                  />
                  <TextField
                    label='Email'
                    inputRef={register({
                      required: true,
                      // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    })}
                    required
                    name='email'
                    variant='outlined'
                  />
                  <TextField
                    label='Phone Number'
                    inputRef={register({
                      required: true,
                      // pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                    })}
                    required
                    name='phoneNumber'
                    variant='outlined'
                  />
                  <TextField
                    label='City'
                    inputRef={register({
                      required: true,
                      // pattern: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/im
                    })}
                    required
                    name='city'
                    variant='outlined'
                  />
                  <TextField
                    label='State'
                    inputRef={register({
                      required: true,
                      // pattern: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/im
                    })}
                    required
                    name='state'
                    variant='outlined'
                  />
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
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
                      <Paper className={classes.formItemPaper}>
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
                      <Paper className={classes.formItemPaper}>
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
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Where are they willing to relocate to?</FormLabel>
                          <Button onClick={() => willingToGoFieldArray.append({location: 'Location'})}>Add Location</Button>
                          {willingToGoFieldArray.fields.map(({ id }, index) => {
                            return (
                              <div key={id}>
                                <TextField
                                  inputRef={register()}
                                  variant='outlined'
                                  name={`willingToGo[${index}].location`}
                                  label='Location'
                                  defaultValue=''
                                />
                                <Button onClick={() => willingToGoFieldArray.remove(index)}>Remove</Button>
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
                      <Paper className={classes.formItemPaper}>
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
                  <Paper className={classes.formItemPaper}>
                    <TextField
                      label='Current Yearly Salary'
                      inputRef={register({ required: true, pattern: /^[0-9]*$/i })}
                      required
                      name='currentSalary'
                      variant='outlined'
                    />
                  </Paper>
                  <Paper className={classes.formItemPaper}>
                    <FormLabel>Skills/Languages</FormLabel>
                    <FormGroup>
                    {
                      skills.map((skill, index) => {
                        return (
                        <FormControlLabel label={skill} control={<Checkbox inputRef={register} color='primary' name={`skills[${index}].skill`}/>} value={skill} />
                        )
                      })
                    }
                    </FormGroup>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.formItemPaper}>
                    <FormLabel>Industries with Experience</FormLabel>
                    <FormGroup>
                    {
                      industries.map((industry, index) => {
                        return (
                        <FormControlLabel label={industry} control={<Checkbox inputRef={register} color='primary' name={`industriesWorkedIn[${index}].industry`}/>} value={industry} />
                        )
                      })
                    }
                    </FormGroup>
                  </Paper>
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Notable companies they have worked for?</FormLabel>
                          <Button onClick={() => companiesWorkedForFieldArray.append({company: 'Company'})}>Add Company</Button>
                          {companiesWorkedForFieldArray.fields.map(({ id }, index) => {
                            return (
                              <div key={id}>
                                <TextField
                                  inputRef={register()}
                                  variant='outlined'
                                  name={`companiesWorkedFor[${index}].company`}
                                  label='Company'
                                  defaultValue=''
                                />
                                <Button onClick={() => companiesWorkedForFieldArray.remove(index)}>Remove</Button>
                              </div>
                            )
                          })}
                        </FormControl>
                      </Paper>
                    }
                    name='companiesWorkedFor'
                    defaultValue=''
                    control={control}
                  />
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Any Startup Experience?</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel value='true' control={<Radio/>} label='Yes'/>
                            <FormControlLabel value='false' control={<Radio/>} label='No'/>
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    }
                    name='startupExperience'
                    control={control}
                    defaultValue='false'
                  />
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
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Certifications</FormLabel>
                          <Button onClick={() => certificationsFieldArray.append({tag: 'Tag'})}>Add Certification</Button>
                          {certificationsFieldArray.fields.map(({ id }, index) => {
                            return (
                              <div key={id}>
                                <TextField
                                  inputRef={register()}
                                  variant='outlined'
                                  name={`certifications[${index}].certification`}
                                  label='Certification'
                                  defaultValue=''
                                />
                                <Button onClick={() => certificationsFieldArray.remove(index)}>Remove</Button>
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
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Degrees</FormLabel>
                          <Button onClick={() => degreesFieldArray.append({tag: 'Tag'})}>Add Degree</Button>
                          {degreesFieldArray.fields.map(({ id }, index) => {
                            return (
                              <div key={id}>
                                <TextField
                                  inputRef={register()}
                                  variant='outlined'
                                  name={`degrees[${index}].degree`}
                                  label='Degrees'
                                  defaultValue=''
                                />
                                <Button onClick={() => degreesFieldArray.remove(index)}>Remove</Button>
                              </div>
                            )
                          })}
                        </FormControl>
                      </Paper>
                    }
                    name='degrees'
                    control={control}
                    defaultValue=''
                  />
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Job Titles</FormLabel>
                          <Button onClick={() => jobTitlesFieldArray.append({tag: 'Tag'})}>Add Job Title</Button>
                          {jobTitlesFieldArray.fields.map(({ id }, index) => {
                            return (
                              <div key={id}>
                                <TextField
                                  inputRef={register()}
                                  variant='outlined'
                                  name={`jobTitles[${index}].jobTitle`}
                                  label='Job Title'
                                  defaultValue=''
                                />
                                <Button onClick={() => jobTitlesFieldArray.remove(index)}>Remove</Button>
                              </div>
                            )
                          })}
                        </FormControl>
                      </Paper>
                    }
                    name='jobTitles'
                    control={control}
                    defaultValue=''
                  />
                  <Controller
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Interview Process Stage</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel value='Submitted' control={<Radio/>} label='Submitted'/>
                            <FormControlLabel value='Client Interview' control={<Radio/>} label='Client Interview'/>
                            <FormControlLabel value='Zoom Screen' control={<Radio/>} label='Zoom Screen'/>
                            <FormControlLabel value='Hired' control={<Radio/>} label='Hired'/>
                            <FormControlLabel value='Not Hired' control={<Radio/>} label='Not Hired'/>
                            <FormControlLabel value='Offer Made' control={<Radio/>} label='Offer Made'/>
                          </RadioGroup>
                        </FormControl>
                      </Paper>}
                    name='stageInProcess'
                    defaultValue='Not Hired'
                    rules={{ required: true }}
                    control={control}
                  />
                  <Paper className={classes.formItemPaper}>
                    <FormLabel>Candidate Notes</FormLabel>
                    <TextField
                      label='Notes'
                      inputRef={register}
                      multiline
                      name='notes'
                      variant='outlined'
                    />
                  </Paper>
                  <Controller
                    control={control}
                    name='jobsAppliedFor'
                    defaultValue=''
                    as={
                      <Paper className={classes.formItemPaper}>
                        <FormControl>
                          <FormLabel>Job Applied For</FormLabel>
                            <Select
                              options={selectOptions}
                              defaultValue=''
                            />
                        </FormControl>
                      </Paper>
                    }
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