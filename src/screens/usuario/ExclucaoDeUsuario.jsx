import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { redirect, useLocation, useParams,useNavigate} from 'react-router-dom';
import MenuFixoDoTopo from '../../components/MenuFixoDoTop';
import Spinner from 'react-bootstrap/Spinner'
import {url} from '../../url/Url'

function StaticExample(){
  
  const{id} = useParams()
  const navigate = useNavigate()
  const[usuario,setUsuario] = useState();

  useEffect(() => {
    ObterUsuario();
  },[]);

  const ObterUsuario = () =>{
    axios.get(url+"/usuario/"+id).then((element)=>{
        setUsuario(element.data)
    })
  }

  const Cancelar = ()=>{
    navigate("/usuarios")
  }

  const Deletar =()=>{
    axios.delete(url+"/usuario/"+id).then(()=>{
       alert("Excluido com sucesso")
       navigate("/usuarios")
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div>
        <MenuFixoDoTopo
          nomeTela={"Lista De Usuários"}
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
            {usuario? 
               <p>Tem certeza que deseja excluir o usuário {usuario.nome}</p>
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
  );
}
export default StaticExample;