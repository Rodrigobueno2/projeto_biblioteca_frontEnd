import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import MenuFixoDoTopo from '../../components/MenuFixoDoTop'
import { url } from '../../url/Url';

export default function ExclucaoDeLivro() {
  const{id} = useParams();
  const[livro,setLivro] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    obterLivro()
  },[])

  const obterLivro=()=>{
     axios.get(url+"/livro/"+id).then((element)=>{
        setLivro(element.data);
     })
  }

  const Cancelar = ()=>{
    navigate("/livros");
  }

  const Deletar = ()=>{
    axios.delete(url+"/livro/"+id).then(()=>{
        alert("Livro deletado com sucesso");
        navigate("/livros/")
    }).catch((err)=>{
        console.log(err);
    })
  }


  return (
    <div>
        <MenuFixoDoTopo
            nomeTela={"Lista De Livros"}
        />
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
        <Modal.Dialog>
            <Modal.Header closeButton>
            <Modal.Title>Excluir</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            {livro? 
               <p>Tem certeza que deseja excluir o livro {livro.titulo}</p>
            :<Spinner animation="border" role="status">
               <span className="visually-hidden">Loading...</span>
            </Spinner>}
            
            </Modal.Body>

            <Modal.Footer>
            <Button variant="secondary" onClick={()=>Cancelar()}>Não</Button>
            <Button variant="primary" onClick={()=>Deletar()}>Sim</Button>
            </Modal.Footer>
        </Modal.Dialog>
        </div>
    </div>
  )
}
