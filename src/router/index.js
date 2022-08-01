import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectPage from '../components/ProtectPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Detail from '../pages/Home/detail';
import Kategori from '../pages/Kategori';
import Search from '../pages/Search';


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
          }
        >
        </Route>
        <Route 
            path='/home/:key' 
            element={
              <ProtectPage>
                 <Detail />
              </ProtectPage>
          }
        >
        </Route>
        <Route 
            path='/kategori/:key' 
            element={
              <Kategori />
          }
        >
        </Route>
        <Route 
            path='/search/:key' 
            element={
              <Search />
          }
        >
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default Router