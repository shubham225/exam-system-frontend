import React from 'react'
import { useParams } from 'react-router-dom'

function Question() {
  const { id } =  useParams();
  return (
    <div>Question {id}</div>
  )
}

export default Question