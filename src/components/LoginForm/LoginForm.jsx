import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {API} from '../../utils/api'
import './LoginForm.css'

const LoginForm = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitLogin = async event => {
    event.preventDefault()

    setErrorMessage('')

    if (username.trim() === '') {
      setErrorMessage('Enter username')
      return
    }

    if (password.trim() === '') {
      setErrorMessage('Enter password')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(API.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        document.cookie = `jwt_token=${encodeURIComponent(
          data.jwt_token,
        )}; path=/; max-age=86400`

        navigate('/', {replace: true})
      } else {
        setErrorMessage(
          data.error_msg || 'Invalid username or password',
        )
      }
    } catch (error) {
      setErrorMessage(
        'Unable to connect to server. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="login-page">
      <div className="login-container">

        {/* LEFT SIDE - INSTAGRAM ILLUSTRATION */}
        <div className="login-image-container">
          <img
            src="/insta-share-login.png"
            alt="Insta Share social media"
            className="login-illustration"
          />
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="login-form-container">

          <div className="login-logo">◎</div>

          <h1 className="login-title">
            Insta Share
          </h1>

          <form
            className="login-form"
            onSubmit={onSubmitLogin}
          >
            <label htmlFor="username">
              USERNAME
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={event =>
                setUsername(event.target.value)
              }
              placeholder="Username"
              disabled={isLoading}
            />

            <label htmlFor="password">
              PASSWORD
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={event =>
                setPassword(event.target.value)
              }
              placeholder="Password"
              disabled={isLoading}
            />

            {errorMessage && (
              <p className="login-error">
                * {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

        </div>
      </div>
    </main>
  )
}

export default LoginForm