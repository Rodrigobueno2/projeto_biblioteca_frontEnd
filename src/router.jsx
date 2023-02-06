import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/home/Home'
import CadastroUsuario from './screens/usuario/CadastroUsuario'
import ListaDeUsuarios from './screens/usuario/ListaDeUsuarios'
import Usuario from './screens/usuario/Usuario'

export default function router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="" element={<Home/>}/>
            <Route path="/cadastroUsuario" element={<CadastroUsuario/>}/>
            <Route path="/usuarios" element={<ListaDeUsuarios/>}/>
            <Route path="/usuarios/:id" element={<Usuario/>}/>
        </Routes>
    </BrowserRouter>
  )
}
