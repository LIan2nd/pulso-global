import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import HomeLayout from "./Layout/HomeLayout"
import Technology from "./pages/news/technology"
import Health from "./pages/news/health"
import Science from "./pages/news/Science"
import Business from "./pages/news/Business"
import NotFound from "./pages/NotFound"
import Detail from "./pages/news/Detail"
import Search from "./pages/news/Search"
import AuthLayout from "./Layout/AuthLayout"
import PublicRoute from "./pages/middleware/PublicRoute"
import ProtectedRoute from "./pages/middleware/ProtectedRoute"
import ProfilePage from "./pages/Profile"

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
          <Route path='/search' element={<Search />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='/profile' element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path='/login' element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path='/register' element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
