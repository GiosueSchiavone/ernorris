import React from 'react'
import '../styles/Casella.css'

const Casella = ({joke}) => {
  return (
    <div className='Casella'>
      <p id='joke'>{joke}</p>
    </div>
  )
}

export default Casella
