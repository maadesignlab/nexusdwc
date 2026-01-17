import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import "./styles/header.css";
import "./styles/home.css";
import "./styles/footer.css"
import "./styles/login.css"
import "./styles/library.css"
import "./styles/bookcard.css";
import "./styles/bookdetail.css";
import "./styles/coworking.css";
import "./styles/coworkingsitecard.css";
import "./styles/coworkingmodal.css";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)