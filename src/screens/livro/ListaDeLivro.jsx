import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MenuFixoDoTopo from '../../components/MenuFixoDoTop'
import { url } from '../../url/Url';
import styles from '../livro/ListaDeLivro.module.css'

export default function ListaDeLivro() {
  const[livros,setLivros] = useState([]);
  const[filtroTitulo,setFiltroTitulo] = useState();
  const[filtroCodigo,setFiltroCodigo] = useState();
  const[filtro,setFiltro] = useState([]);
  const navigate = useNavigate();

  const filtrarTitulo =()=>{
    setFiltro(livros);
    if(filtroTitulo !== ""){
      setFiltro(livros.filter((livros)=>livros.titulo.toLowerCase() === filtroTitulo.toLowerCase()))
    }
  }

  const filtrarCodigo =()=>{
   setFiltro(livros);
   if(filtroCodigo !== ""){
     setFiltro(livros.filter((livros)=>livros._id === filtroCodigo))
   }
 }


  function onChangeFiltrarTitulo(event){
     setFiltroTitulo(event.target.value)
  }

  function onChangeFiltrarCodigo(event){
     setFiltroCodigo(event.target.value)
  }

  useEffect(() => {
    ListarLivros();
  },[]);

  const ListarLivros = ()=>{
    axios.get(url+"/livro").then((element)=>{
        setLivros(element.data);
        setFiltro(element.data)
    }).catch((erro)=>{
        console.log(erro);
    })
  }

  return (
    <div>
      <MenuFixoDoTopo
          nomeTela={"Lista de Livros"}
       />
       <Button type="button" variant='primary'> <Link to="/cadastroLivro"  className={styles.link}>+ Adicionar Livro</Link></Button>
       <hr/>
       <input type="text" name="filtroTitulo"  placeholder="Filtrar livro por titulo" onChange={onChangeFiltrarTitulo} />
       <Button variant="primary" onClick={()=>filtrarTitulo()}>Filtrar livro por Titulo</Button>
       <input type="text" name="filtroCodigo"  placeholder="Filtrar livro pelo codigo" onChange={onChangeFiltrarCodigo} />
       <Button variant="primary" onClick={()=>filtrarCodigo()}>Filtrar livro pelo Codigo</Button>
       <div>
          {filtro.map((element,key)=>(
             <div className={styles.livros}>
                ***Livro: {key+1}***<Row/>
               Codigo do Livro: {element._id}<Row/>
               Titulo do Livro: {element.titulo}<Row/>
               <Button type='button' variant="primary" className={styles.botoes} onClick={()=>navigate('/usuarios/'+element._id)}>Visualizar</Button>
               <Button type='button' variant="danger" className={styles.botoes} onClick={()=>navigate('/excluirUsuario/'+element._id)}>Excluir</Button>
               <Button type='button' variant="success" className={styles.botoes} onClick={()=>navigate('/cadastroUsuario/'+element._id)}>Atualizar</Button>
             </div>
          ))}
       </div>

    </div>
  )
}
