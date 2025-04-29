import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import InputExample from './components/InputExample.jsx'
import MyFake from './components/MyFake.jsx'
import LessonUseEffect from './components/lessonUseEffect.jsx'
import { useState } from 'react'
import GifSearch from './components/GifSearch.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <InputExample /> */}
    {/* {<MyFake />} */}
    {/* <LessonUseEffect /> */}
    {/* <GifSearch /> */}
    

  </StrictMode>,
)
