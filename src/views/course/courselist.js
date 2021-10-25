import React, { useEffect, useState } from 'react'
import Card from '../../components/card'
import Interface from '../../components/interface'
import Table from '../../components/table'
import CourseDetail from './course.modal'

export default function CourseList() {

  const [refreshData, setRefreshData] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [courseList, setCourseList] = useState([])
  const [courseData, setCourseData] = useState({
    ID: undefined,
    DESCRIPTION: undefined,
    CREDITS: undefined,
    FRECUENCY: undefined,
    HOURS: undefined
  })

  const [isEdit, setIsEdit] = useState(false)

  const columns = [
    { name: 'ID', dataSource: 'ID' },
    { name: 'Descripción', dataSource: 'DESCRIPTION' },
    { name: 'Créditos', dataSource: 'CREDITS' },
    { name: 'Frecuencia', dataSource: 'FRECUENCY' },
    { name: 'Horas', dataSource: 'HOURS' },
  ]

  const actions = [
    {
      name: 'Editar',
      props: {
        className: 'btn btn-sm btn-primary',
        onClick: e => {
          getCourse(e.target.id)
        }
      }
    }
  ]

  const getCourse = (id) => {
    setCourseData(courseList.filter(item => item.ID === id).pop())
    setIsEdit(true)
    setIsVisibleModal(true)
  }

  useEffect(() => {
    fetch('http://localhost:19876/Course/Get')
      .then(response => response.json()).then(data => setCourseList(data.Data))
  }, [refreshData])

  useEffect(() => {
    fetch('http://localhost:19876/Course/Get')
      .then(response => response.json()).then(data => setCourseList(data.Data))
  }, [])

  const newCourse = () => {
    setCourseData({})
    setIsVisibleModal(true)
  }

  return (
    <Interface>
      <Card>
        <button className="btn btn-primary" onClick={newCourse}>Agregar asignatura</button>
      </Card>
      <CourseDetail isVisible={isVisibleModal} isEdit={isEdit} setIsVisible={(status) => setIsVisibleModal(status)} courseData={courseData} refreshData={() => setRefreshData(!refreshData)}/>
      <Table title="Asignaturas" description="Asignaturas disponibles en la universidad" dataSource={courseList} columns={columns} actions={actions} />
    </Interface>
  )
}
