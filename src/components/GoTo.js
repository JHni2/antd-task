import { Link } from 'react-router-dom'

const GoToComponent = (props) => {
  const { component } = props

  return (
    <div className="nav">
      <Link to={'/' + component}>
        <p>Go To {component}</p>
      </Link>
    </div>
  )
}

export default GoToComponent
