import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/home/Home'
import CadastroUsuario from './screens/usuario/CadastroUsuario'
import ExclucaoDeUsuario from './screens/usuario/ExclucaoDeUsuario'
import ListaDeUsuarios from './screens/usuario/ListaDeUsuarios'
import Usuario from './screens/usuario/Usuario'
import CadastroLivro from './screens/livro/CadastroLivro'
import ListaDeLivro from './screens/livro/ListaDeLivro'
import Livro from './screens/livro/Livro'
import ExclucaoDeLivro from './screens/livro/ExclucaoDeLivro'
import CadastroEmprestimo from './screens/emprestimo/CadastroEmprestimo'

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
            <Route path="/cadastroLivro" element={<CadastroLivro/>}/>
            <Route path="/livros" element={<ListaDeLivro/>}/>
            <Route path="/livros/:id" element={<Livro/>}/>
            <Route path="/cadastroLivro/:id" element={<CadastroLivro/>}/>
            <Route path="/excluirLivro/:id" element={<ExclucaoDeLivro/>}/>
            <Route path="/cadastroEmprestimo" element={<CadastroEmprestimo/>}/>
        </Routes>
    </BrowserRouter>
  )
}
