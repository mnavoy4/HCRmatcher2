import React, { useState, useEffect } from 'react';
import { tableIcons } from '../assets/tableIcons';
import MaterialTable from 'material-table';
import * as jobs from '../jobData';

export default function AllJobsContainer(){

  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    setJobData(jobs.default.jobs)
  }, [])
  return (
    <div>
      <h1>All Jobs</h1>
      <MaterialTable
        title = "All Jobs"
        icons={tableIcons}
        columns={[
          { title: "Title", field: 'title' , type: 'string'},
          { title: "Location", field: 'location' , type: 'string'},
          { title: "Is Remote?", field: 'isRemote', type: 'boolean' },
          { title: "Overall Seniority in Years", field: 'overallExperience' },
          { title: "Qualifications", field: 'skillsRequired' },
          { title: "Skills", field: 'skills' },
          { title: "Industries", field: 'industry' },
          { title: "US Citizenship Required?", field: "citizenshipRequired", type: 'boolean'},
          { title: "Security Clearance", field: 'securityClearance' }
        ]}
        options={{
          search: true,
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
  )
}