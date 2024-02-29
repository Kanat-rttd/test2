import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import theme from './utils/helpers/theme.ts'
import { ToastProvider } from './utils/providers/ToastProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ToastProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ToastProvider>
        </ChakraProvider>
    </React.StrictMode>,
)
