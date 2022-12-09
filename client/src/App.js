import react from "react"

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//css
import "./styles/main.css"

//Pages
import HomePage from "./Pages/HomePage/index"
import LoginPage from "./Pages/LoginPage/index"
import AdminPage from "./Pages/AdminPage/index"

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' exact element={<Navigate to='/home' />} />
        <Route path='/home' exact element={<HomePage />} />
        <Route path='/login' exact element={<LoginPage />} />
        <Route path='/login/admin' exact element={<AdminPage />} />
        <Route path='*' exact element={<div style={{ textAlign: "center", width: "100%", fontSize: "3rem" }}> 404 Not Found</div>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
