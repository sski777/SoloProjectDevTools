import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'
const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientid = import .meta.env.VITE_CLIENT_ID
const apiaudience = import.meta.env.VITE_API_AUDIENCE
// here we are getting the "root" dive from index.html and by using the DOM and also importing out root parent component
// we are also wrapping out renders app in strict mode
// vite only exposes .env variables that start with vite
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Auth0Provider
      domain={domain}
      clientId={clientid}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: apiaudience
      }}>
      <App/>
    </Auth0Provider>
  </StrictMode>
)
