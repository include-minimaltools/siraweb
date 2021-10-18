import React, { useEffect, useState } from 'react'
import Table from '../../components/table'

export default function CourseList() {

  const [courseList, setCourseList] = useState([])

  useEffect(() => {
    fetch('http://localhost:19876/Course/Get')
      .then(response => response.json()).then(data => setCourseList(data.Data))
  }, [])

  return (
    <div>
      <Table title="Asignaturas" description="Asignaturas disponibles en la universidad" header={["ID", "Descripción","Créditos","Frecuencia","Horas"]} 
        content={courseList.map(element => {
          return <tr>
            <td>{element.ID}</td>
            <td>{element.DESCRIPTION}</td>
            <td>{element.CREDITS}</td>
            <td>{element.FRECUENCY}</td>
            <td>{element.HOURS}</td>
          </tr>
        })} 
      />
    </div>
  )
}
