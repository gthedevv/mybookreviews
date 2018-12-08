import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='rl_container'>
      <h2>Page Not Found!</h2>
      <Link to='/'><button>Back to Homepage</button></Link>
    </div>
  )
}
