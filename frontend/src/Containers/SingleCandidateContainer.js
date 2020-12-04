import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'


const baseURL = 'http://localhost:5000/candidates'


export default function AllCadidatesContainer() {

  let { id } = useParams();

  const [candidateData, setCandidateData] = useState([]);
  console.log(id)
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(baseURL + `/${id}`)
      setCandidateData(result.data)
    }
    fetchData();
  }, []);

  console.log(candidateData)

  return (
    <div>
      <h1>Candidate Page</h1>
    </div>
  )
}