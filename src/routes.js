import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Subscribe from './pages/Subscribe';
import Login from './pages/Login';

function MainRoutes() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/cadastro' element={<Subscribe />} />
    </Routes>
  )
}

export default MainRoutes