import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import TablePage from './pages/Table'
import ChartPage from './pages/Chart'
import RegExPage from './pages/RegEx'
import './index.css'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/table" element={<TablePage />}></Route>
        <Route path="/chart" element={<ChartPage />}></Route>
        <Route path="/regEx" element={<RegExPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
