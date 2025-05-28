import { useState } from 'react'
import './index.css'
import ProtectedRoute from './ProtectedRoute'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage'
import NotFoundPage from './Components/NotFound'
import Navbar from './Components/NavBar'
import AboutPage from './Components/AboutPage'
import JsonFormatter from './Components/JSONFomatter'
import RegexTester from './Components/regextester'
import Base64Tool from './Components/Base64'
import JwtDecoder from './Components/JWTDecoder' // the dots indicate the level from the current directory to the target directory and then draw the file path
import UuidGenerator from './Components/UUIDGenerator'
import UnixTimestampTool from './Components/UNIXTimestamp'
import ColorConverter from './Components/colorconverter.jsx'
import AuthStatusPage from './Components/PleaseLogIn.jsx'
import Profile from './Components/profile.jsx'
import ActiviyTracker from './Components/ActivityTracker.jsx'
// file is in thisame directory (same level) so only one dot
// import.meta.env.(your secret key), diffent to back-end also do not need to load the configs and thus import the library-vite handles this.
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/json' element={<ProtectedRoute><JsonFormatter/></ProtectedRoute>}></Route>
        <Route path='/regex' element={<ProtectedRoute><RegexTester/></ProtectedRoute>}></Route>
        <Route path='/pleaselogin' element={<AuthStatusPage/>}></Route>
        <Route path='/jwt' element={<ProtectedRoute><JwtDecoder/></ProtectedRoute>}></Route>
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
        <Route path='/activity' element={<ProtectedRoute><ActiviyTracker/></ProtectedRoute>}></Route>
        <Route path='/uuid' element={<ProtectedRoute><UuidGenerator/></ProtectedRoute>}></Route>
        <Route path='/color' element={<ProtectedRoute><ColorConverter/></ProtectedRoute>}></Route>
        <Route path='/timestamp' element={<ProtectedRoute><UnixTimestampTool/></ProtectedRoute>}></Route>
        <Route path='/base64' element={<ProtectedRoute><Base64Tool/></ProtectedRoute>}></Route>
        <Route path='/about' element={<AboutPage/>}></Route>
        <Route path='*' element={<NotFoundPage/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
