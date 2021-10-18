import React from 'react'
import { Link } from 'react-router-dom'

export default function NavItem(props) {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={props.to}>
        <i className="icon-grid menu-icon" />
        <span className="menu-title">{props.text}</span>
      </Link>
    </li>
  )
}
