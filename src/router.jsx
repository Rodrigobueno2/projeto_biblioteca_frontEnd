import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/home/Home'
import CadastroUsuario from './screens/usuario/CadastroUsuario'

export default function router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="" element={<Home/>}/>
            <Route path="/cadastroUsuario" element={<CadastroUsuario/>}/>
        </Routes>
    </BrowserRouter>
  )
}
