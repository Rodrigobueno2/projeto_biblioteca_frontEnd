import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import MenuFixoDoTopo from '../../components/MenuFixoDoTop';
import styles from '../usuario/Usuario.module.css'

export default function Usuario() {
  const {id} = useParams();
  const [usuario , setUsuario] = useState();

  useEffect(() => {
     BuscarUsuario();

  },[]);
  
   const BuscarUsuario = () =>{
    axios.get("https://crudcrud.com/api/97cdd265e66d42bbbd0601f9f8d549bc/usuario/"+id).then((element)=>{
       
       setUsuario(element.data)
    }).catch((err)=>{
        console.log(err)
       
    })
  }


  return (
    <div>
      <MenuFixoDoTopo
        nomeTela={"Usuário "}
      />
       <b>Usuario:</b> {id}
       {usuario?
          <p>
            <b>Nome Completo:</b> {usuario.nome}<br/>
            <b>Data de Nascimento:</b> {usuario.dataDeNascimento}<br/>
            <b>CPF: </b>{usuario.cpf}<br/>
            <div className={styles.endereco}>
            <b>Endereço: </b><br/>
            <b>Rua/Avenida: </b>{usuario.endereco.rua}<br/>
            <b>Número: </b>{usuario.endereco.numero}<br/>
            <b>Bairro: </b>{usuario.endereco.bairro}<br/>
            <b>Cidade: </b>{usuario.endereco.cidade}<br/>
            <b>Complemento: </b>{usuario.endereco.complemento}<br/>
            </div>
            <b>Contatos:</b> 
            <div className={styles.listaDeContatos}>
              {usuario.contatos.map((element,key)=>(
                <div className={styles.contatos}>
                  <b>Contato:</b> {key+1} - {element.nomeContato}<br/>
                  <b>Telefone:</b> {element.telefone}<br/>
                  <b>Email:</b> {element.email}
                </div>
              ))}
            </div>
          </p>
          
          : <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
        }
            
    </div>
    
  )
}
