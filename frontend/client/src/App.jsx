import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Provider } from "react-redux";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { Notfound } from "./pages/Notfound";
import { store } from "./store";
import './App.css'

function App() {

  return (
  <Provider store={store}>
    <BrowserRouter>
    
      <Routes>
        <Route path='/' element={<Navigate to="/login" />}/>
        <Route path="/home" element={ <Home /> }/>
        <Route path="/login" element={ <Login /> }/>
        <Route path="/register" element={ <Register /> }/>
        <Route path="*" element={ <Notfound /> }/>
      </Routes>

    </BrowserRouter>
  </Provider>
  )
}

export default App
