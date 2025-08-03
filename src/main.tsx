import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import './assets/styles/index.scss'
import { MainContextProvider } from './contexts/mainContext/MainContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainContextProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </MainContextProvider>
  </StrictMode>,
)
