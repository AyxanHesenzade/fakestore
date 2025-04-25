import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import InputExample from './components/InputExample.jsx'
import MyFake from './components/MyFake.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <InputExample /> */}
    {<MyFake />}
  </StrictMode>,
)
