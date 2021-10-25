import React, { useEffect, useState } from 'react'
import Card from '../../components/card'
import Interface from '../../components/interface'
import Table from '../../components/table'
import CareerDetail from './career.modal'

export default function CareerList() {

  const [careerList, setCareerList] = useState([])
  const [careerItem, setCareerItem] = useState({
    ID: undefined, DESCRIPTION: undefined, FACULTY: undefined, CAMPUS: undefined
  })
  const [isEdit, setIsEdit] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)

  useEffect(() => {
    fetch('http://localhost:19876/Career/Get')
      .then(response => response.json()).then(data => setCareerList(data.Data))
  }, [])

  const columns = [
    { name: 'ID', dataSource: 'ID' },
    { name: 'Descripción', dataSource: 'DESCRIPTION' },
    { name: 'Facultad', dataSource: 'FACULTY' },
    { name: 'Campus', dataSource: 'CAMPUS' },
  ]

  const actions = [
    {
      name: 'Editar',
      props: {
        className: 'btn btn-sm btn-primary',
        onClick: e => {
          getCareer(e.target.id)
        }
      }
    }
  ]

  const getCareer = (id) => {
    const career = careerList.filter(campus => campus.ID === id).pop()
    setCareerItem({
      ID: career.ID,
      DESCRIPTION: career.DESCRIPTION,
      FACULTY: career.FACULTY,
      CAMPUS: career.CAMPUS,
      CAREER: career.CAREER
    })
    setIsEdit(true)
    setIsVisibleModal(true);
  }

  const cleanAndOpenModal = () => {
    setCareerItem({ID: undefined, DESCRIPTION: undefined, FACULTY: undefined, CAMPUS: undefined})
    setIsEdit(false)
    setIsVisibleModal(true);
  }

  return (
    <Interface>
      <CareerDetail isVisible={isVisibleModal} setIsVisible={(status) => setIsVisibleModal(status)} isEdit={isEdit} data={careerItem}/>
      <Card>
        <button className="btn btn-primary"
        onClick={ cleanAndOpenModal }
        >Agregar Carrera</button>
      </Card>
      <Table title="Carreras" description="Campus disponibles en la universidad" columns={columns} actionTitle="Acciones" actions={actions} dataSource={careerList} />
    </Interface>
  )
}
