import { Col, Form, Input, message, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import ModalView from '../../components/modal'

const { Option } = Select

export default function CourseDetail({ courseData, isEdit, isVisible, setIsVisible, refreshData }) {

  const [carrerList, setCareerList] = useState([])

  useEffect(() => {
    fetch('http://localhost:19876/Career/Get')
    .then(response => response.json()).then(data => setCareerList(data.Data))
  },[])

  const insertOrUpdateCourse = (e) => {
    console.log(e)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(e)
    };

    fetch('http://localhost:19876/Course/InsertOrUpdate', requestOptions)
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
    <ModalView visible={isVisible} key="studentModal">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={courseData}
        onFinish={insertOrUpdateCourse}
        autoComplete="off"
      >
        <Form.Item
          label="Id:"
          name="ID"
          rules={[{ required: true, message: 'Por favor, ingrese un id' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Descripción:"
          name="DESCRIPTION"
          rules={[{ required: true, message: 'Por favor, ingrese una descripción' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Carrera:"
          name="ID_CAREER"
          rules={[{ required: true, message: 'Por favor, ingrese los creditos de la asignatura' }]}
        >
          <Select>
            {carrerList.map(element => {
              return <Option value={element.ID} key={element.ID}>{element.DESCRIPTION}</Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Creditos:"
          name="CREDITS"
          rules={[{ required: true, message: 'Por favor, ingrese los creditos de la asignatura' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Frecuencia:"
          name="FRECUENCY"
          rules={[{ required: true, message: 'Por favor, ingrese la frecuencia de la clase' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Horas:"
          name="HOURS"
          rules={[{ required: true, message: 'Por favor, ingrese las horas destinadas' }]}
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
  )
}
