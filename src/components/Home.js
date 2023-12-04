import React from 'react'
import { Link } from 'react-router-dom'

const HomeComponent = () => {
  return (
    <div>
      <div>
        <Link to="/table">
          <p>Resizable Table 보러 가기</p>
        </Link>
      </div>
      <div>
        <Link to="/chart">
          <p>Chart 보러 가기</p>
        </Link>
      </div>
    </div>
  )
}

export default HomeComponent
