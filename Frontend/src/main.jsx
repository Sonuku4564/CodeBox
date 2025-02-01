import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom'

const domain = "dev-apdbnhlmrfywteqy.us.auth0.com";
const clientId = "JAsvvLWfRdZMem1qgbbfaqCWSa2K48wj";

createRoot(document.getElementById('root')).render(
<Auth0Provider
  domain={domain}
  clientId={clientId}
  authorizationParams={{ redirect_uri: window.location.origin }}
>
<BrowserRouter>
      <App />
</BrowserRouter>
</Auth0Provider>

)
