import React from 'react'

const PageTitle = ({title}:{title:string}) => {
  return (
    <h1 className='text-primary text-xl font-bold'>{title}</h1>
  )
}

export default PageTitle