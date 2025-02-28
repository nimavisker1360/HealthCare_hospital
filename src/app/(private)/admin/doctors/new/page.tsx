import PageTitle from '@/components/page-title'
import React from 'react'
import DoctorForm from '../_components/doctor-form'

const AddDoctorPage = () => {
  return (
    <div className='p-5'>
        <PageTitle title='Add Doctor' />
        <DoctorForm/>
    </div>
  )
}

export default AddDoctorPage