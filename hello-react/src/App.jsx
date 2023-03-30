import React from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
export default function App() {
  return (
    <div style={{width:"100%",height:"100%"}}>
        {/* <NavLink to="/login">登录</NavLink> */}
        <Routes>
            <Route element={<Login/>} path="/login/*"></Route>
            <Route element={<Home/>} path="/home/*"></Route>
            <Route element={<Navigate to="/login" />} path="/"></Route>
        </Routes>
    </div>
  )
}
