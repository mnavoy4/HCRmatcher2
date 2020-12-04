import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'


const baseURL = 'http://localhost:5000/jobs'


export default function SingleJobContainer() {

  let { id } = useParams();

  const [jobData, setJobData] = useState([]);
  console.log(id)
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(baseURL + `/${id}`)
      setJobData(result.data)
    }
    fetchData();
  }, []);

  console.log(jobData)

  return (
    <div>
      <h1>Job Page</h1>
    </div>
  )
}