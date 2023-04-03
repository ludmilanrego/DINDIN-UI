import { Outlet, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Subscribe from './pages/Subscribe';
import Login from './pages/Login';
import { getItem } from './utils/storage'

function MainRoutes() {

  function ProtectedRoutes({ redirectTo }) {
    const token = getItem('token');
    return token ? <Outlet /> : <Navigate to={redirectTo} />
  }


  return (
    <Routes>

      <Route path='/' element={<Login />} />

      <Route path='/cadastro' element={<Subscribe />} />

      <Route element={<ProtectedRoutes redirectTo="/" />}>
        <Route path='/home' element={<Home />} />
      </Route>

    </Routes>
  )
}

export default MainRoutes