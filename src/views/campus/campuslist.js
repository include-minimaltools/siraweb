import React, { useEffect, useState } from 'react'
import Card from '../../components/card'
import Col from '../../components/col'
import Interface from '../../components/interface'
import ModalView from '../../components/modal'
import Row from '../../components/row'
import Table from '../../components/table'
import { message } from 'antd'

export default function CampusList() {
  const [campusList, setCampusList] = useState([])
  const [campusItem, setCampusItem] = useState({
    ID: undefined,
    DESCRIPTION: undefined,
    ADDRESS: undefined
  })
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const handleCampus = (id, description, address) => {
    setCampusItem({
      ID: id || campusItem.ID,
      DESCRIPTION: description || campusItem.DESCRIPTION,
      ADDRESS: address || campusItem.ADDRESS
    })
  }

  const AddCampus = event => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campusItem)
    };

    fetch('http://localhost:19876/Campus/InsertOrUpdate', requestOptions)
      .then(response => {
        message.config({top: 60})
        if(response.status === 200)
        {
          message.success(`Se ha ${(isEdit ? 'editado' : 'agregado')} el campus`)
          getCampusList();
          setIsVisibleModal(false)
        }else{
          message.error(`No se ha podido ${(isEdit ? 'editar' : 'agregar')} el campus`)
        }
        
      });
    
    
  }

  const getCampusList = () => {
    fetch('http://localhost:19876/Campus/Get')
    .then(response => response.json()).then(data => {
      console.log(data)
      setCampusList(data.Data)
    })
  }

  const getCampus = (id) => {
    const campus = campusList.filter(campus => campus.ID === id).pop()
    setCampusItem({
      ID: campus.ID,
      DESCRIPTION: campus.DESCRIPTION,
      ADDRESS: campus.ADDRESS
    })
    setIsEdit(true)
    setIsVisibleModal(true);
  }

  useEffect(() => {
    getCampusList()
  }, [])

  const columns = [
    {
      name: 'ID',
      dataSource: 'ID'
    },
    {
      name: 'Descripción',
      dataSource: 'DESCRIPTION'
    },
    {
      name: 'Dirección',
      dataSource: 'ADDRESS'
    },
  ]

  const actions = [
    {
      name: 'Editar',
      props: {
        className: 'btn btn-sm btn-primary',
        onClick: e => {
          getCampus(e.target.id)
        }
      }
    }
  ]

  const cleanAndOpenModal = () => {
    setIsEdit(false)
    setCampusItem({
      ID: undefined,
      DESCRIPTION: undefined,
      ADDRESS: undefined
    })
    setIsVisibleModal(true);
  }

  return (
    <Interface>
      <ModalView title="Nuevo Campus" description="Información y localización del campus" visible={isVisibleModal}>
        <Row>
          <Col size='md'>
            <Row>
              <label className="col-sm-auto col-form-label">ID:</label>
              <Col size='sm'>
                <input type="text" disabled={isEdit} className="form-control" value={campusItem.ID} onChange={(e) => handleCampus(e.target.value)} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <label className="col-sm-auto col-form-label">Descripción:</label>
              <div className="col-sm">
                <input type="text" className="form-control" value={campusItem.DESCRIPTION} onChange={(e) => handleCampus(null,e.target.value)} />
              </div>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <label className="col-sm-auto col-form-label">Dirección:</label>
              <div className="col-sm">
                <textarea type="text" className="form-control" value={campusItem.ADDRESS} onChange={(e) => handleCampus(null,null,e.target.value)} />
              </div>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <button className="btn btn-light" onClick={() => setIsVisibleModal(false)}>Volver</button>
          </Col>
          <Col>
            <div onClick={AddCampus} className="btn btn-primary mr-2">{(isEdit ? "Editar" : "Agregar")}</div>
          </Col>
        </Row>
      </ModalView>
      <Card>
        <button className="btn btn-primary" onClick={ cleanAndOpenModal }>Agregar Campus</button>
      </Card>
      <Table title="Campus" description="Campus disponibles en la universidad" columns={columns} actionTitle="Acciones" dataSource={campusList} actions={actions} />
    </Interface>
  )
}
