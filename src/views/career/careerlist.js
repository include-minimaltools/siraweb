import React, { useEffect, useState } from 'react'
import Table from '../../components/table'

export default function CareerList() {

  const [careerList, setCareerList] = useState([])

  useEffect(() => {
    fetch('http://localhost:19876/Career/Get')
      .then(response => response.json()).then(data => setCareerList(data.Data))
  }, [])

  const columns= [
  {name:'ID', dataSource:'ID'},
  {name:'Descripción', dataSource:'DESCRIPTION'},
  {name:'Facultad', dataSource:'FACULTY'},
  {name:'Campus', dataSource:'CAMPUS'},
  {name:'Carrera', dataSource:'CAREER'}
]

  return (
    <div>
      <Table title="Carreras" description="Campus disponibles en la universidad" columns={columns} accionTitle="Acciones" dataSource={careerList}/>
    </div>
  )
}
