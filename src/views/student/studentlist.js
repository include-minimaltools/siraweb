import React, { useEffect, useState } from 'react'
import Card from '../../components/card'
import Interface from '../../components/interface'
import Table from '../../components/table'
import StudentDetail from './student.modal';

export default function StudentList() {

  const [studentList, setStudentList] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [isEdit, setIsEdit] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [refreshData, setRefreshData] = useState(false)

  const columns = [
    { name: 'Carnet', dataSource: 'CARNET' },
    { name: 'Nombre', dataSource: 'NAME' },
    { name: 'Apellido', dataSource: 'LASTNAME' },
    { name: 'Dirección', dataSource: 'ADDRESS' },
    { name: 'Teléfono', dataSource: 'PHONE' },
    { name: 'Carrera', dataSource: 'CAREER' },
  ]

  const actions = [
    {
      name: 'Editar',
      props: {
        className: 'btn btn-sm btn-primary',
        onClick: e => {
          getStudent(e.target.id)
        }
      }
    }
  ]

  const getStudent = (id) => {
    setStudentData(studentList.filter(item => item.CARNET === id).pop())
    setIsEdit(true)
    setIsVisibleModal(true)
  }

  useEffect(() => {
    console.log('refresh')
    fetch('http://localhost:19876/Student/Get')
      .then(response => response.json()).then(data => setStudentList(data.Data))
  }, [refreshData])

  const newStudent = () => {
    setStudentData({})
    setIsEdit(false)
    setIsVisibleModal(true)
  }

  return (
    <Interface>
      <StudentDetail isEdit={isEdit} isVisible={isVisibleModal} setIsVisible={(status) => setIsVisibleModal(status)} studentData={studentData} refreshData={() => setRefreshData(!refreshData)}/>
      <Card>
        <button className="btn btn-primary" onClick={newStudent}>Agregar estudiante</button>
      </Card>
      <Table title="Estudiantes" description="Estudiantes de la universidad" dataSource={studentList} columns={columns}  actionTitle='Editar' actions={actions}/>
    </Interface>
  )
}
