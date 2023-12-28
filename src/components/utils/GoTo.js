import { Link } from 'react-router-dom'

const GoToHome = () => {
  return (
    <div className="nav">
      <Link to="/">
        <p>Go To Home</p>
      </Link>
    </div>
  )
}

export default GoToHome
