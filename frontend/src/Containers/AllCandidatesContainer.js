import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { tableIcons } from '../assets/tableIcons'
import NavBar from '../Components/NavBar';
import axios from 'axios';

const baseURL = 'http://localhost:5000/candidates'

export default function AllCadidatesContainer() {

  const [candidateData, setCandidateData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(baseURL)
      setCandidateData(result.data)
    }
    fetchData();
  }, [])

  return (
    <div>
      <NavBar/>
      <h1 className='table-h1'>All Candidates</h1>
      <div className='table-container'>
        <MaterialTable
          title = "All Candidates"
          icons={tableIcons}
          columns={[
            { title: "Name", field: 'name' , type: 'string' },
            { title: "Location", field: 'state' , type: 'string' },
            { title: "Wants Remote?", field: 'wantsRemote', type: 'boolean' },
            { title: "Willing to relocate?", field: 'openToRelocation', type: 'boolean' },
            // { title: "Skills", field: 'skills' },
            { title: "Industries with Experience", field: 'industriesWorkedIn' },
            { title: "US Citizen", field: "usCitizen", type: 'boolean'},
            { title: "Security Clearance", field: 'clearance' }
          ]}
          options={{
            search: true,
            filtering: true,
            actionsColumnIndex: -1
          }}
          data={candidateData}
          actions={[
            {
              icon: 'Delete',
              tooltip: 'Delete Candidate',
              onClick: (event, rowData) => alert("You want to delete this candidate " + rowData.name)
            }
          ]}
        />
      </div>
      
    </div>
  )
}