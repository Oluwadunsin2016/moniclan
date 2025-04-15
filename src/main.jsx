import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './globals.css'
import './font.css'
import App from './App.jsx'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { AuthProvider } from './lib/AuthContext.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
   <NextUIProvider>
    <App />
   </NextUIProvider>
   </AuthProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
