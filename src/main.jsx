// import React from "react";
// import ReactDOM from "react-dom/client";
// import { App } from "./App.jsx";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );




///for lamborghini

import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import { Stats } from '@react-three/drei'
import { Leva } from 'leva'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <Suspense fallback={null}>
    <App />
    <Stats />
    <Leva collapsed />
  </Suspense>
)
