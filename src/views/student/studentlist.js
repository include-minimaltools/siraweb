import React, { useEffect, useState } from 'react'
import Table from '../../components/table'

export default function StudentList() {

  const [studentList, setStudentList] = useState([])

  useEffect(() => {
    fetch('http://localhost:19876/Student/Get')
      .then(response => response.json()).then(data => setStudentList(data.Data))
  }, [])

  return (
    <div>
      <Table title="Estudiantes" description="Estudiantes de la universidad" header={["Carrera", "Nombre","Apellido","Dirección","Teléfono","Carrera"]} 
        content={studentList.map(element => {
          return <tr>
            <td>{element.CARNET}</td>
            <td>{element.NAME}</td>
            <td>{element.LASTNAME}</td>
            <td>{element.ADDRESS}</td>
            <td>{element.PHONE}</td>
            <td>{element.CAREER}</td>
          </tr>
        })} 
      />
    </div>
  )
}
