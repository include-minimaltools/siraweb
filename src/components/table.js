import React from 'react'

export default function Table({ title, description, columns, dataSource, actionTitle, actions }) {
  return (
    <div className='row'>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="card-description">
              {description}
            </p>
            <div className="table-responsive">
              <table className="table" key={title}>
                <thead>
                  <tr>
                    {columns.map(column => <th key={column.dataSource}>{column.name}</th>)}
                    { actions && <th>{actionTitle}</th> }
                  </tr>
                </thead>
                <tbody>
                  {dataSource.map((element, index) => <tr key={index}>
                    {Object.entries(element).map(([key, value]) => columns.map(column => column.dataSource === key ? <td key={key}>{value}</td> : null))}
                    { actions && actions.map((action, index) => <td key={index}><button id={element.ID || element.CARNET} {...action.props}>{action.name}</button></td>) }
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
