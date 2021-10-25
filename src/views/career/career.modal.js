import { Col, Form, Input, message, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import ModalView from '../../components/modal'

const { Option } = Select

export default function CareerDetail({ data, isEdit, isVisible, setIsVisible, refreshData }) {

  const [campusList, setCampusList] = useState([])
  const [facultyList, setFacultyList] = useState([])

  useEffect(() => {
    fetch('http://localhost:19876/Campus/Get')
    .then(response => response.json()).then(data => setCampusList(data.Data))
  },[])

  useEffect(() => {
    fetch('http://localhost:19876/Faculty/Get')
    .then(response => response.json()).then(data => setFacultyList(data.Data))
  },[])

  const insertOrUpdateCareer = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(e)
    };

    fetch('http://localhost:19876/Career/InsertOrUpdate', requestOptions)
    .then(response => {
      message.config({top: 60})
      console.log(response.status)
      if(response.status === 200)
      {
        message.success(`Se ha ${(isEdit ? 'editado' : 'agregado')} el campus`)
        refreshData && refreshData()
        setIsVisible(false)
      }else{
        message.error(`No se ha podido ${(isEdit ? 'editar' : 'agregar')} el campus`)
      }
    });
  }

  const closeModal = () => {
    setIsVisible(false)
  }

  return (
    <ModalView visible={isVisible}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ Id: data.ID, Description: data.DESCRIPTION,Faculty: data.FACULTY, Campus: data.CAMPUS }}
        onFinish={insertOrUpdateCareer}
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
        <Form.Item
          label="Facultad:"
          name="Faculty"
          rules={[{ required: true, message: 'Por favor, ingrese los creditos de la asignatura' }]}
        >
          <Select>
            {facultyList.map(element => {
              return <Option value={element.ID}>{element.DESCRIPTION}</Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Campus:"
          name="Campus"
          rules={[{ required: true, message: 'Por favor, ingrese los creditos de la asignatura' }]}
        >
          <Select>
            {campusList.map(element => {
              return <Option value={element.ID}>{element.DESCRIPTION}</Option>
            })}
          </Select>
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
  )
}
