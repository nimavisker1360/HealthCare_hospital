import React from 'react'
import { UserButton } from '@clerk/nextjs'

const DashboardPage = () => {
  return (
    <div className='p-5 flex flex-col'>
      <h1>Dashboard Page</h1>
      <UserButton/>
    </div>
  )
}

export default DashboardPage