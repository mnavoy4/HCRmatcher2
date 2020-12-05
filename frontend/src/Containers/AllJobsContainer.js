import React, { useState, useEffect } from 'react';
import { tableIcons } from '../assets/tableIcons';
import MaterialTable from 'material-table';
import NavBar from '../Components/NavBar';
import axios from 'axios';
import AddButton from '../Components/AddButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import ConfirmDeleteButton from '../Components/ConfirmDeleteButton'

const baseURL = 'http://localhost:5000/jobs'

export default function AllJobsContainer(){

  // const [modalClicked, setModalClicked] = useState(false)

  const fetchData = async () => {
    const result = await axios(baseURL)
    setJobData(result.data)
  }

  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    fetchData()
  }, []);

  // const toggleDeleteModal = () => {
  //   setModalClicked(!modalClicked)
  // }

  const deleteJob = (id) => {
    axios.delete(baseURL + `/${id}`)
      .then(fetchData())
  }

  console.log(jobData)
  return (
    <div>
      <NavBar/>
      <h1 className='table-h1'>All Jobs</h1>
      <div className='table-container'>
        <AddButton whatToAdd={'Job'} linkTo={'/add-job'}/>
        <MaterialTable
          title = "All Jobs"
          icons={tableIcons}
          columns={[
            { title: "Title", field: 'title' , type: 'string', render: rowData => <Link to={`/job/${rowData._id}`}>{rowData.title}</Link> },
            { title: "Location", field: 'state' , type: 'string'},
            { title: "Is Remote?", field: 'remote', type: 'boolean' },
            // { title: "Qualifications", field: 'skillsRequired' },
            // { title: "Skills", field: 'skills' },
            // { title: "Industries", field: 'industries' },
            { title: "US Citizenship Required?", field: "citizenshipRequired", type: 'boolean'},
            { title: "Security Clearance Required?", field: 'securityClearanceRequired' }
          ]}
          
          options={{
            search: true,
            filtering: true,
            actionsColumnIndex: -1
          }}
          data={jobData}
          actions={[
            {
              icon: () => <FontAwesomeIcon icon={faTrash} />,
              tooltip: 'Delete Job',
              onClick: (event, rowData) => deleteJob(rowData._id)
            }
          ]}
        />
      </div>
      {/* <Dialog
        open={modalClicked}
        onClose={toggleDeleteModal}
      >
        <DialogTitle>{"Please confirm you want to delete job"}</DialogTitle>
        <DialogActions>
          <ConfirmDeleteButton onClick={deleteJob}/>
          <Button>Do not delete</Button>
        </DialogActions>
      </Dialog> */}
    </div>
  )
}