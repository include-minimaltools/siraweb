import React, { useEffect, useState } from 'react'
import Table from '../../components/table'

export default function FacultyList() {

  const [facultyList, setFacultyList] = useState([])

  useEffect(() => {
    fetch('http://localhost:19876/Faculty/Get')
      .then(response => response.json()).then(data => setFacultyList(data.Data))
  }, [])

  return (
    <div>
      <Table title="Facultades" description="Facultades de la universidad" header={["ID", "Descripción"]} 
        content={facultyList.map(element => {
          return <tr>
            <td>{element.ID}</td>
            <td>{element.DESCRIPTION}</td>
          </tr>
        })} 
      />
    </div>
  )
}
