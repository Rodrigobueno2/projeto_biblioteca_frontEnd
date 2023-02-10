import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/home/Home'
import CadastroUsuario from './screens/usuario/CadastroUsuario'
import ExclucaoDeUsuario from './screens/usuario/ExclucaoDeUsuario'
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
            <Route path="/cadastroUsuario/:id" element={<CadastroUsuario/>}/>
            <Route path="/excluirUsuario/:id" element={<ExclucaoDeUsuario/>}/>
        </Routes>
    </BrowserRouter>
  )
}
