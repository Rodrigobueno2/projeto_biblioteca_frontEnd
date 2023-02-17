import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import MenuFixoDoTopo from '../../components/MenuFixoDoTop';
import { url } from '../../url/Url';

export default function () {
  const navigate = useNavigate();
  const[livro,setLivro] = useState();
  const {id} = useParams();

  useEffect(()=>{
     obterLivro();
  },[])

  const obterLivro = ()=>{
    axios.get(url+"/livro/"+id).then((element)=>{
      setLivro(element.data);
    }).catch((err)=>{
        console.log(err);
    })
  }

  return ( 
    <div>
        <MenuFixoDoTopo
        nomeTela={"Livro"}
        
        />
        <b>Livro {id}</b>
        {livro?
          <p>
             <b>Titulo do Livro: </b>{livro.titulo}<br/>
             <b>Editora do Livro: </b>{livro.editora}<br/>
             <b>ISBN do Livro: </b>{livro.isbn}<br/>
             <b>Autor do Livro: </b>{livro.autor}<br/>
             <b>Gênero do Livro: </b>{livro.genero}<br/>
             <Button type='button' variant="danger" onClick={()=>navigate('/excluirLivro/'+id)}>Excluir</Button>
             <Button type='button' variant="success" onClick={()=>navigate('/cadastroLivro/'+id)} >Atualizar</Button>
          </p>
        :<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>}
    </div>
  )
}
