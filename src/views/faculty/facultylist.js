import { Form, Input, Col, Row, message } from 'antd'
import React, { useEffect, useState } from 'react'
import Card from '../../components/card'
import Interface from '../../components/interface'
import ModalView from '../../components/modal'
import Table from '../../components/table'

export default function FacultyList() {

  const [facultyList, setFacultyList] = useState([])
  const [faculty, setFaculty] = useState({ ID: undefined, DESCRIPTION: undefined })
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const columns = [
    { name: 'ID', dataSource: 'ID' },
    { name: 'Descripción', dataSource: 'DESCRIPTION' },
  ]

  const actions = [
    {
      name: 'Editar',
      props: {
        className: 'btn btn-sm btn-primary',
        onClick: e => {
          getFaculty(e.target.id)
        }
      }
    }
  ]

  const getFacultyList = () => {
    fetch('http://localhost:19876/Faculty/Get')
      .then(response => response.json()).then(data => setFacultyList(data.Data))
  }

  const getFaculty = (id) => {
    const item = facultyList.filter(item => item.ID === id).pop()
    setFaculty({
      ID: item.ID,
      DESCRIPTION: item.DESCRIPTION,
    })
    setIsEdit(true)
    setIsVisibleModal(true)
  }

  useEffect(() => {
    fetch('http://localhost:19876/Faculty/Get')
      .then(response => response.json()).then(data => setFacultyList(data.Data))
  }, [])

  const cleanAndOpenModal = () => {
    setFaculty({})
    setIsEdit(false)
    setIsVisibleModal(true)
  }

  const insertOrUpdateFaculty = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(e)
    };

    fetch('http://localhost:19876/Faculty/InsertOrUpdate', requestOptions)
    .then(response => {
      message.config({top: 60})
      if(response.status === 200)
      {
        message.success(`Se ha ${(isEdit ? 'editado' : 'agregado')} el campus`)
        getFacultyList();
        setIsVisibleModal(false)
      }else{
        message.error(`No se ha podido ${(isEdit ? 'editar' : 'agregar')} el campus`)
      }
    });
  }

  const closeModal = () => {
    setIsEdit(false)
    setIsVisibleModal(false)
  }

  return (
    <Interface>
      <ModalView title="Nuevo Campus" description="Información y localización del campus" visible={isVisibleModal}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ Id: faculty.ID, Description: faculty.DESCRIPTION }}
          onFinish={insertOrUpdateFaculty}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Id:"
            name="Id"
            rules={[{ required: true, message: 'Por favor, ingrese un id' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Descripción:"
            name="Description"
            rules={[{ required: true, message: 'Por favor, ingrese una descripción' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Row align='middle'>
              <Col offset={2}>
                <button onClick={closeModal} className='btn btn-sm btn-light'>
                  Volver
                </button>
              </Col>
              <Col offset={2}>
                <button type="submit" className='btn btn-sm btn-primary'>
                  {isEdit ? "Editar" : "Añadir"}
                </button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </ModalView>

      <Card>
        <button className="btn btn-primary" onClick={cleanAndOpenModal}>Agregar facultad</button>
      </Card>
      <Table title="Facultades" description="Facultades de la universidad" dataSource={facultyList} columns={columns} actions={actions} actionTitle="Acción" />
    </Interface>
  )
}
