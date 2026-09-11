import {useNavigate} from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }

  return (
    <main className="not-found-page">
      <div className="not-found-container">

        <img
          src="https://assets.ccbp.in/frontend/react-js/insta-share/instagram-not-found.png"
          alt="page not found"
          className="not-found-image"
        />

        <h1 className="not-found-title">
          Page Not Found
        </h1>

        <p className="not-found-description">
          Sorry, the page you are looking for does not exist.
        </p>

        <button
          type="button"
          className="not-found-button"
          onClick={goHome}
        >
          Go Home
        </button>

      </div>
    </main>
  )
}

export default NotFound