import React, { useEffect, useState } from 'react'
import MenuFixoDoTopo from '../../components/MenuFixoDoTop'
import Button from 'react-bootstrap/Button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from '../usuario/ListaDeUsuarios.module.css'
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

export default function ListaDeUsuarios() {
  
  const[usuarios,setUsuarios] = useState([]);
  const[filtroUsuario,setFiltroUsuario] = useState();
  const[filtroMatricula,setFiltroMatricula] = useState();
  const[filtro,setFiltro] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    ListarUsuarios();
  },[]);


   const ListarUsuarios = () =>{
      axios.get("https://crudcrud.com/api/97cdd265e66d42bbbd0601f9f8d549bc/usuario").then((element)=>{
               setUsuarios(element.data);
               setFiltro(element.data)
               console.log(usuarios)
            }).catch((err)=>{
               console.log(err)
            })
   } 

   const filtrar =()=>{
     setFiltro(usuarios);
     if(filtroUsuario !== ""){
       setFiltro(usuarios.filter((usuarios)=>usuarios.nome === filtroUsuario))
     }
   }

   const filtrarMatricula =()=>{
    setFiltro(usuarios);
    if(filtroMatricula !== ""){
      setFiltro(usuarios.filter((usuarios)=>usuarios._id === filtroMatricula))
    }
  }


   function onChangeFiltrarUsuario(event){
      setFiltroUsuario(event.target.value)
   }

   function onChangeFiltrarMatricula(event){
      setFiltroMatricula(event.target.value)
   }


  return (
    <div>
        <MenuFixoDoTopo
        nomeTela={"Lista De Usuários"}
        />
        <p>{filtroUsuario}</p>
       <div>
            <Button type="button" variant='primary'> <Link to="/cadastroUsuario"  className={styles.link}>+ Adicionar Usuario</Link></Button>
       </div>
       <hr/>
       <div>
         <input type="text" name="filtroUsuario"  placeholder="Filtrar usuário" onChange={onChangeFiltrarUsuario} />
         <Button variant="primary" onClick={()=>filtrar()}>Filtrar Usuário</Button>
         <input type="text" name="filtroMatricula"  placeholder="Filtrar matricula" onChange={onChangeFiltrarMatricula} />
         <Button variant="primary" onClick={()=>filtrarMatricula()}>Filtrar Matricula</Button>
       </div>
       <div>
           {filtro.map((element,key)=>(
             <div className={styles.usuarios}>
               ***Usuário: {key+1}***<Row/>
               Matricula: {element._id}<Row/>
               Nome usuário: {element.nome}<Row/>
               <Button type='button' variant="primary" className={styles.botoes} onClick={()=>navigate('/usuarios/'+element._id)}>Visualizar</Button>
               <Button type='button' variant="danger" className={styles.botoes}>Excluir</Button>
               <Button type='button' variant="success" className={styles.botoes}>Atualizar</Button>
               </div>
           ))}
       </div>
    </div>
  )
}
