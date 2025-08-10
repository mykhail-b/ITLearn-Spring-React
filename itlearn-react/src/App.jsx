import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './router'
import MainHeader from './components/MainHeader'
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <div className="main-content">
        <AppRoutes />
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
