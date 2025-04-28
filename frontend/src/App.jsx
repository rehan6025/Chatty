import { Route , Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import ChatPage from './Pages/ChatPage'

function App() {

  return (
    <>
    <Routes>

      <Route path='/' Component={HomePage}/>
      <Route path='/chats' Component={ChatPage}/>
    </Routes>
    </>
  )
}

export default App
