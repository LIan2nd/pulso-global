import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import HomeLayout from "./Layout/HomeLayout"
import Technology from "./pages/news/technology"
import Health from "./pages/news/health"
import Science from "./pages/news/Science"
import Business from "./pages/news/Business"
import NotFound from "./pages/NotFound"
import Detail from "./pages/news/Detail"

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
          <Route path='/news/:slug' element={<Detail />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
