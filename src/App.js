import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeComponent from './components/Home'
import TableComponent from './components/Table'
import './index.css'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeComponent />}></Route>
        <Route path="/table" element={<TableComponent />}></Route>
      </Routes>
    </div>
  )
}

export default App
