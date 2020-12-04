import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ConfirmDeleteButton(props){
  const classes = useStyles()
  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        startIcon={<DeleteForeverOutlinedIcon />}
      >
        Delete {props.whatToAdd}
      </Button>
    </div>
  )
}