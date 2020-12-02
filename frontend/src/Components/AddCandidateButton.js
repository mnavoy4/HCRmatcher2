import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link } from 'react-router-dom';

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
        <Link to='/add-candidate' style={{ color: 'whitesmoke' }}>
        Add Candidate
        </Link>
      </Button>
    </div>
  )
}