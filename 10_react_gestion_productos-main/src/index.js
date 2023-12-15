import React from "react";
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-fu7cf42mzqb6q6dn.us.auth0.com"
    clientId="2jcI0YXBhCjPEMKA6ScqsWqqCp8E28kO"
    authorizationParams={{
      redirect_uri: 'http://localhost:3000/callback'
    }}
  >
    <App />
  </Auth0Provider>
);