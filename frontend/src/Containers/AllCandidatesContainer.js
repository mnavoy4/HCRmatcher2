import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { tableIcons } from '../assets/tableIcons'
import NavBar from '../Components/NavBar';
import axios from 'axios';
import AddButton from '../Components/AddButton';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const baseURL = 'http://localhost:5000/candidates'

export default function AllCadidatesContainer() {

  const [candidateData, setCandidateData] = useState([]);
  const fetchData = async () => {
    const result = await axios(baseURL)
    setCandidateData(result.data)
  }
  useEffect(() => {
    fetchData()
  }, []);

  const deleteCandidate = (id) => {
    axios.delete(baseURL + `/${id}`)
      .then(fetchData())
  }

  return (
    <div>
      <NavBar/>
      <h1 className='table-h1'>All Candidates</h1>
      <div className='table-container'>
        <AddButton whatToAdd={'Candidate'} linkTo={'/add-candidate'}/>
        <MaterialTable
          title = "All Candidates"
          icons={tableIcons}
          columns={[
            { title: "Name", field: 'name' , type: 'string', render: rowData => <Link to={`/candidate/${rowData._id}`}>{rowData.name}</Link> },
            { title: "Location", field: 'state' , type: 'string' },
            { title: "Wants Remote?", field: 'wantsRemote', type: 'boolean' },
            { title: "Willing to relocate?", field: 'openToRelocation', type: 'boolean' },
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
              icon: () => <FontAwesomeIcon icon={faTrash} />,
              tooltip: 'Delete Candidate',
              onClick: (event, rowData) => deleteCandidate(rowData._id)
            }
          ]}
        />
      </div>
      
    </div>
  )
}