import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Components/NavBar';


const baseURL = 'http://localhost:5000/candidates'


export default function SingleCandidateContainer() {

  let { id } = useParams();

  const [candidateData, setCandidateData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(baseURL + `/${id}`)
      setCandidateData(result.data)
    }
    fetchData();
  }, []);

  return (
    <div>
      <NavBar/>
      <h1>Candidate Page</h1>
    </div>
  )
}