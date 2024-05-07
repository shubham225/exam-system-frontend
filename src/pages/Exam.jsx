import React from 'react'
import { useParams } from 'react-router-dom'

function Exams() {
  const { id } = useParams()
  return (
    <div>Exams {id}</div>
  )
}

export default Exams