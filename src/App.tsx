import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthGuard from './components/auth/AuthGuard'
import Navbar from './components/shared/Navbar'
import Community from './pages/Community'
import Consulting from './pages/Consulting'
import Familly from './pages/Familly'
import Home from './pages/Home'
import Mymenu from './pages/Mymenu'
import Signin from './pages/Signin'

function App() {
  return (
    <BrowserRouter>
      <AuthGuard>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/familly" element={<Familly />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/myMenu" element={<Mymenu />} />
          <Route path="/community" element={<Community />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default App
