import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Grid, Button, Container, Checkbox, TextField } from '@material-ui/core';


export default function AddCandidateContainer(){

  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <header className='add-candidates-header'>
        <h1>Add Candidate</h1>
      </header>
      <main>
        <Grid container spacing={12}>
          <form>
            <TextField
              label='Name'
            />
          </form>
        </Grid>
 
      </main>
    </div>
  )
}