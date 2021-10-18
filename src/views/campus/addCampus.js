import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddCampus() {

  const [ID, setID] = useState('')
  const [Description, setDescription] = useState('')
  const [Address, setAddress] = useState('')

  const handleID = e => setID(e.target.value)
  const handleDescription = e => setDescription(e.target.value)
  const handleAddress = e => setAddress(e.target.value)

  const AddCampus = event => {
    console.log(ID, Description, Address); 
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ID: ID,
        DESCRIPTION: Description,
        ADDRESS: Address
      })
    };

    fetch('http://localhost:19876/Campus/InsertOrUpdate', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
  }

  return (
    <div>
      <div className="col-8 grid-margin">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Nuevo Campus</h4>
            <form className="form-sample">
              <p className="card-description">
                Información y localización del campus
              </p>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">ID</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" value={ID} onChange={handleID} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Descripción</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" value={Description} onChange={handleDescription}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Dirección</label>
                    <div className="col-sm-9">
                      <textarea type="text" className="form-control" value={Address} onChange={handleAddress} />
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={AddCampus} className="btn btn-primary mr-2">Crear</div>
              <Link to="/Campus" className="btn btn-light">Volver</Link>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}
