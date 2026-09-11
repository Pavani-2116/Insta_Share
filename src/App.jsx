import {Navigate, Route, Routes} from 'react-router-dom'

import LoginForm from './components/LoginForm/LoginForm'
import Home from './components/Home/Home'
import MyProfile from './components/MyProfile/MyProfile'
import UserDetails from './components/UserDetails/UserDetails'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import NotFound from './components/NotFound/NotFound'

const App = () => {
  return (
    <Routes>

      <Route
        path="/login"
        element={<LoginForm />}
      />

      <Route element={<ProtectedRoute />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/my-profile"
          element={<MyProfile />}
        />

        <Route
          path="/users/:id"
          element={<UserDetails />}
        />

      </Route>

      <Route
        path="/404"
        element={<NotFound />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  )
}

export default App