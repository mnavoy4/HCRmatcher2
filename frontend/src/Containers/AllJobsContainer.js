import React, { useState, useEffect } from 'react';
import { tableIcons } from '../assets/tableIcons';
import MaterialTable from 'material-table';
import NavBar from '../Components/NavBar';
import axios from 'axios';

const baseURL = 'http://localhost:5000/jobs'

export default function AllJobsContainer(){

  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(baseURL)
      setJobData(result)
    }
    fetchData()
  }, [])
  return (
    <div>
      <NavBar/>
      <h1 className='table-h1'>All Jobs</h1>
      <div className='table-container'>
        <MaterialTable
          title = "All Jobs"
          icons={tableIcons}
          columns={[
            { title: "Title", field: 'title' , type: 'string' },
            { title: "Location", field: 'state' , type: 'string'},
            { title: "Is Remote?", field: 'remote', type: 'boolean' },
            { title: "Overall Seniority in Years", field: 'overallExperience' },
            { title: "Qualifications", field: 'skillsRequired' },
            { title: "Skills", field: 'skills' },
            { title: "Industries", field: 'industries' },
            { title: "US Citizenship Required?", field: "citizenshipRequired", type: 'boolean'},
            { title: "Security Clearance", field: 'securityClearance' }
          ]}
          
          options={{
            search: true,
            filtering: true,
            actionsColumnIndex: -1
          }}
          data={jobData}
          actions={[
            {
              icon: 'delete',
              tooltip: 'Delete Job',
              onClick: (event, rowData) => alert("You want to delete this job " + rowData.name)
            }
          ]}
        />
      </div>
      
    </div>
  )
}