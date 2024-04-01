import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='notFound text-center'>
      <div className='container'>
        {/* <img src='../image/oop.png' className='img-fluid' alt='Oops' /> */}
        <h3>404 - Page not found</h3>
        <p>The page you are looking for might have been removed, had it's name changed or it's temporarily unavailable</p>
        <Link to='/' className='btn btn-default btn-lg'>Go to Home</Link>
      </div>
    </div>
  )
}
