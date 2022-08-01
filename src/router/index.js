import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProtectPage from '../components/ProtectPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Detail from '../pages/Home/detail';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
            path='/login'
            element={<Login />}
        >            
        </Route>
        <Route 
            path='/register'
            element={<Register />}
        >            
        </Route>
        <Route 
            path='/' 
            element={
                 <Home />
            //   <ProtectPage>
            //   </ProtectPage>
          }
        >
        </Route>
        <Route 
            path='/home/:key' 
            element={
                 <Detail />
            //   <ProtectPage>
            //   </ProtectPage>
          }
        >
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default Router