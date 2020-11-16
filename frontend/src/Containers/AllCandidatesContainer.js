import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import * as candidates from '../data';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

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
        icons={tableIcons}
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
          search: true,
          actionsColumnIndex: -1
        }}
        data={candidateData}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Delete Candidate',
            onClick: (event, rowData) => alert("You want to delete this candidate " + rowData.name)
          }
        ]}
      />
    </div>
  )
}