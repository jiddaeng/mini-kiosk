import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import JangPage from './pages/JangPage'
import SuccessPurchasePage from './pages/SuccessPurchasePage'


function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/jangpage' element={<JangPage/>} />
        <Route path='/successpurchasepage' element={<SuccessPurchasePage/>} />
      </Routes>
    </div>
  )
}

export default App
