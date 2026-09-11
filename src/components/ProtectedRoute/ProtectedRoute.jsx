import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = () => {
  const jwtToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('jwt_token='))

  if (!jwtToken) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute