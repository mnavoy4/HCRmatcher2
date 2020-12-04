import React, { useState, useEffect } from 'react';
import { tableIcons } from '../assets/tableIcons';
import MaterialTable from 'material-table';
import NavBar from '../Components/NavBar';
import axios from 'axios';
import AddButton from '../Components/AddButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const baseURL = 'http://localhost:5000/jobs'

export default function AllJobsContainer(){

  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(baseURL)
      setJobData(result.data)
    }
    fetchData()
  }, [])
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
              onClick: (event, rowData) => alert("You want to delete this job " + rowData.name)
            }
          ]}
        />
      </div>
      
    </div>
  )
}