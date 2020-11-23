import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function AddCandidateButton(){
  const classes = useStyles()
  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Add Candidate
      </Button>
    </div>
  )
}