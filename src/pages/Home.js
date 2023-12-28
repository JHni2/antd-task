import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

const HomePage = () => {
  return (
    <div>
      <div className="home-align">
        <Link to="/table">
          <p>Resizable Table</p>
        </Link>
        <Link to="/chart">
          <p>Chart</p>
        </Link>
        <Link to="/regEx">
          <p>Regural Expression</p>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
