import React, { useEffect, useState } from 'react'
import Table from '../../components/table'

export default function RoleList() {

  const [roleList, setRoleList] = useState([])

  useEffect(() => {
    fetch('http://localhost:19876/Role/Get')
      .then(response => response.json()).then(data => setRoleList(data.Data))
  }, [])

  return (
    <div>
      <Table title="Roles" description="Roles de usuario" header={["ID", "Descripción"]} 
        content={roleList.map(element => {
          return <tr>
            <td>{element.ID}</td>
            <td>{element.DESCRIPTION}</td>
          </tr>
        })} 
      />
    </div>
  )
}
