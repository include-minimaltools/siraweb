import { Col, Form, Input, message, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import ModalView from '../../components/modal'

const { Option } = Select;

export default function StudentDetail({ studentData, isEdit, isVisible, setIsVisible, refreshData }) {

  const [carrerList, setCareerList] = useState([])

  useEffect(() => {
    fetch('http://localhost:19876/Career/Get')
      .then(response => response.json()).then(data => setCareerList(data.Data))
  }, [])

  const insertOrUpdateStudent = (e) => {
    console.log(e)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(e)
    };

    fetch('http://localhost:19876/Student/InsertOrUpdate', requestOptions)
      .then(response => {
        message.config({ top: 60 })
        console.log(response.status)
        if (response.status === 200) {
          message.success(`Se ha ${(isEdit ? 'editado' : 'agregado')} el estudiante`)
          refreshData && refreshData()
          setIsVisible(false)
        } else {
          message.error(`No se ha podido ${(isEdit ? 'editar' : 'agregar')} el estudiante`)
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
        initialValues={studentData}
        onFinish={insertOrUpdateStudent}
        autoComplete="off"
      >
        <Form.Item
          label="Carnet:"
          name="CARNET"
          rules={[{ required: true, message: 'Por favor, ingrese un carnet' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nombres:"
          name="NAME"
          rules={[{ required: true, message: 'Por favor, ingrese un nombre' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Apellidos:"
          name="LASTNAME"
          rules={[{ required: true, message: 'Por favor, ingrese un apellido' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Domicilio:"
          name="ADDRESS"
          rules={[{ required: true, message: 'Por favor, ingrese una dirección' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Teléfono:"
          name="PHONE"
          rules={[{ required: true, message: 'Por favor, ingrese un número telefónico' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Carrera:"
          name="CAREER"
          rules={[{ required: true, message: 'Por favor, ingrese una carrera' }]}
        >
          <Select>
            {carrerList.map(element => {
              return <Option key={element.ID} value={element.ID}>{element.DESCRIPTION}</Option>
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
