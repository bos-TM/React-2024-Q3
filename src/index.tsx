import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Get the root container
const container = document.getElementById('root')

// Create a root
const root = ReactDOM.createRoot(container!)

// Initial render: Render an element to the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
