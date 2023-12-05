import React, { createContext, useContext, useState } from 'react'

const DragContext = createContext()

export const DragProvider = ({ children }) => {
  const [isDrag, setIsDrag] = useState(false)

  const setDragState = (value) => {
    setIsDrag(value)
  }

  return <DragContext.Provider value={{ isDrag, setDragState }}>{children}</DragContext.Provider>
}

export const useDrag = () => {
  const context = useContext(DragContext)
  if (!context) {
    throw new Error('useDrag must be used within a DragProvider')
  }
  return context
}
