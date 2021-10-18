import React from 'react'

export default function Card({ children, title, description }) {
  return (
    <div className='row'>
      <div className='col-12 grid-margin stretch-card'>
        <div className='card'>
          <div className='card-body'>
            { title && <h4 className="card-title">{title}</h4>}
            { description && <p className="card-description">{description}</p>}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
