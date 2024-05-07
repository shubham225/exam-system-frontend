import React from 'react'
import { useParams } from 'react-router-dom'

function Module() {
  const {moduleId} =  useParams();
  return (
    <div>Module {moduleId}</div>
  )
}

export default Module