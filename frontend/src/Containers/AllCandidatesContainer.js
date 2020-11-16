import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import * as candidates from '../data';

export default function AllCadidatesContainer() {

  const [candidateData, setCandidateData] = useState([])
  useEffect(() => {
    setCandidateData(candidates.default.candidates)
  }, [])
  console.log(candidateData);
  return (
    <div>
      <h1>All Candidates</h1>
      <MaterialTable
        title = "All Candidates"
        columns={[
          { title: "Name", field: 'name' , type: 'string'},
          { title: "Location", field: 'location' , type: 'string'},
          { title: "Wants Remote?", field: 'wantsRemote', type: 'boolean' },
          { title: "Willing to relocate?", field: 'willingToRelocate', type: 'boolean' },
          { title: "Skills", field: 'skills' },
          { title: "Industries with Experience", field: 'industriesWorkedIn' },
          { title: "US Citizen", field: "usCitizen", type: 'boolean'},
          { title: "Security Clearance", field: 'clearance' }
        ]}
        options={{
          search: true
        }}
        data={candidateData}
      />
    </div>
  )
}