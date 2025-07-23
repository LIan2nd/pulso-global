import { Route, Routes } from "react-router"
import Home from "./pages/home"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import HomeLayout from "./Layout/HomeLayout"
import Technology from "./pages/news/technology"
import Health from "./pages/news/health"
import Science from "./pages/news/Science"
import Business from "./pages/news/Business"

function App() {

  return (
    <>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/technology' element={<Technology />} />
          <Route path='/health' element={<Health />} />
          <Route path='/science' element={<Science />} />
          <Route path='/business' element={<Business />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
