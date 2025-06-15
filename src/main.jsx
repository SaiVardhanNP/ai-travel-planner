import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Index from './pages/index.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/custom/Header.jsx'
import Second from './pages/Second.jsx'
import CreateTrip from './create-trip/CreateTrip.jsx'
import { Toaster } from 'sonner'
import ViewTrip from './view-trip/[id]/ViewTrip.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/index",
    element:<Index/>
  },
  {
    path:"/create-trip",
    element:<CreateTrip/>
  },
  {
    path:"/view-trip/:id",
    element:<ViewTrip/>
  }
])

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster/>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
)
