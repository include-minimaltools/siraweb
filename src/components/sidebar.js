import React from 'react'
import NavItem from './navitem'

export default function SideBar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <NavItem text="Campus" to="/Campus"/>
        <NavItem text="Carreras" to="/Career"/>
        <NavItem text="Asignaturas" to="/Course"/>
        <NavItem text="Estudiantes" to="/Students"/>
        <NavItem text="Facultades" to="/Faculty"/>
        <NavItem text="Roles" to="/Role"/>
        <NavItem text="Usuarios" to="/User"/>
      </ul>
    </nav>

  )
}
