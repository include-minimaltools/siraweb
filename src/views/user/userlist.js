import React, { useEffect, useState } from 'react'
import Table from '../../components/table'

export default function UserList() {

  const [userList, setUserList] = useState([])

  useEffect(() => {
    fetch('http://localhost:19876/User/Get')
      .then(response => response.json()).then(data => setUserList(data.Data))
  }, [])

  return (
    <div>
      <Table title="Usuarios" description="Control de usuarios" header={["Nombre de Usuario", "Rol"]} 
        content={userList.map(element => {
          return <tr>
            <td>{element.USERNAME}</td>
            <td>{element.ROLE}</td>
          </tr>
        })} 
      />
    </div>
  )
}
