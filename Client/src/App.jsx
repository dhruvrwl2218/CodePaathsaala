import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'
import "./index.css"

const App = () => {
  return (
    <div className='bg-black'>
       <Header/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default App
