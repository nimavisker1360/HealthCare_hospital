import PageTitle from '@/components/page-title'
import React from 'react'
import DoctorForm from '../../_components/doctor-form'

const EditDoctorPage = () => {
  return (
    <div className='p-5'>
        <PageTitle title='Edit Doctor'/>
        <DoctorForm/>
    </div>
  )
}

export default EditDoctorPage
