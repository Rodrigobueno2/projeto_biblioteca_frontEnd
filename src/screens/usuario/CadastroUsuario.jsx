import React,{useEffect, useState} from "react";
import { Form } from "react-bootstrap";
import MenuFixoDoTopo from "../../components/MenuFixoDoTop";
import styles from "../usuario/CadastroUsuario.module.css"
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import * as yup from "yup";
import { useParams,redirect } from "react-router-dom";
import axios from "axios";
import {url} from '../../url/Url'

export default function CadastroUsuario() {
  const initialValoresUsuario = {
    nome: "",
    cpf: "",
    dataDeNascimento: "",
  };

  const[usuario,setUsuario] = useState(initialValoresUsuario);
  const[endereco,setEndereco] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    complemento: ""
  })
  const [contatos, setContatos] = useState({
    nomeContato: "",
    telefone: "",
    email: "",
  });
  const [listaContatos, setListaContatos] = useState([]);
  const [status, setStatus] = useState({
    tipo : "",
    mensagem : ""
  })


  const {id} = useParams();

  
  useEffect(() => {
    if(id){
      obterUsuarioPorId()
    }

 },[]);

 const obterUsuarioPorId = ()=>{
    axios.get(url+"/usuario/"+id).then((element)=>{
       setUsuario(element.data);
       setListaContatos(element.data.contatos)
       setEndereco(element.data.endereco)
    }).catch((err)=>{
       console.log(err);
    })
 }

  let schema = yup.object().shape({
    nome: yup.string("Necessario preencher o campo nome").required("Necessario preencher o campo nome"),
    cpf:  yup.string("Necessario preencher o campo cpf").required("Necessario preencher o campo cpf"),
    dataDeNascimento: yup.string("Necessario preencher o campo data de Nascimento").required("Necessario preencher a data de nascimento"),

  });

  let schemaEndereco = yup.object().shape({
    rua: yup.string("Necessario preencher o campo rua/avenida").required("Necessario preencher o campo rua/avenida"),
    numero: yup.string("Necessario preencher o numero da residencia").required("Necessario preencher o numero da residencia"),
    bairro: yup.string("Necessario preencher o nome do bairro").required("Necessario preencher o nome do bairro"),
    cidade: yup.string("Necessario preencher o nome da cidade").required("Necessario preencher o nome da cidade"),
  });

  let schemaContato = yup.object().shape({
    nomeContato: yup.string("Necessario preencher o campo nome do contato").required("necessario preencher o campo nome do contato"),
    email: yup.string("Necessario preencher o campo email").required(" necessario preencher o campo email").email("email invalido"),
    telefone: yup.string("Necessario preencher o campo telefone").required("necessario preencher o campo telefone")
    
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    schema.validate(usuario).then(()=>{
      schemaEndereco.validate(endereco).then(()=>{
        if(id){
          setStatus({tipo:"sucesso",mensagem:"alteração realizado com sucesso"})
          alterar()
        }else{
          setStatus({tipo:"sucesso",mensagem:"cadastro realizado com sucesso"})
      
          salvar()
        }
        
      }).catch((erro)=>{
        alert(erro)
        setStatus({tipo:"erro",mensagem:""+erro})
      })
      
      
     }).catch((erro)=>{
      alert(erro)
      setStatus({tipo:"erro",mensagem:""+erro})
     })
    
    
  };

  function onChange2(ev) {
    const { name, value } = ev.target;
    setContatos({ ...contatos, [name]: value });
  }
  
  function onChangeEndereco(ev){
    const { name, value } = ev.target;
    setEndereco({ ...endereco, [name]: value });
  }

  function onChange(ev){
    const { name, value } = ev.target;
    setUsuario({ ...usuario, [name]: value });
  }


  function adicionarContato() {
    schemaContato.validate(contatos).then(()=>{
      setStatus({tipo:"",mensagem:""});
      setListaContatos([
        ...listaContatos,
        {
          nomeContato: contatos.nomeContato,
          telefone: contatos.telefone,
          email: contatos.email,
        },
      ]);
   }).catch((erro)=>{
    setStatus({tipo:"erro",mensagem:""+erro})
   })
  
     
  }

  const removerContato = (contatoComNomeDeletar) => {
    setListaContatos(
      listaContatos.filter(
        (listaContatos) => listaContatos.nomeContato !== contatoComNomeDeletar
      )
    );
  };

  const salvar = ()=>{
    axios.post(url+"/usuario",{
      nome:usuario.nome,
      cpf:usuario.cpf,
      dataDeNascimento:usuario.dataDeNascimento,
      endereco:{
        rua:endereco.rua,
        numero:endereco.numero,
        bairro:endereco.bairro,
        cidade:endereco.cidade,
        complemento:endereco.complemento,

      },
      contatos:listaContatos
    }).then(()=>{

    }).catch((erro)=>{

    })
  }


  const alterar = ()=>{
    axios.put(url+"/usuario/"+id,{
      nome:usuario.nome,
      cpf:usuario.cpf,
      dataDeNascimento:usuario.dataDeNascimento,
      endereco:{
        rua:endereco.rua,
        numero:endereco.numero,
        bairro:endereco.bairro,
        cidade:endereco.cidade,
        complemento:endereco.complemento,

      },
      contatos:listaContatos
    }).then(()=>{

    }).catch((err)=>{

    })
  }

  return (
    <div>
        <MenuFixoDoTopo nomeTela={"Cadastro do Usuário"} />
        <Form  onSubmit={handleSubmit} className={styles.forms}>
            {status.tipo==='erro' ? <p style={{color:"red"}}>{status.mensagem}</p>:""}
            {status.tipo==='sucesso' ? <p style={{color:"green"}}>{status.mensagem}</p>:""}
            <div className={styles.divNome}>
              <label>Nome Completo *: </label>
              <input type="text" name="nome" onChange={onChange} className={styles.inputs} placeholder="Digite seu nome completo" value={usuario.nome} />
              <label>CPF *: </label>
              <input type="text" name="cpf" onChange={onChange} className={styles.inputs} placeholder="00000000000" value={usuario.cpf} />
            </div>
            <div className={styles.divNome}>
              <label>Data de Nascimento *: </label>
              <input type="date" name="dataDeNascimento" onChange={onChange} className={styles.date} value={usuario.dataDeNascimento}/>
              <label>Rua/Avenida *: </label>
              <input type="text" name="rua" onChange={onChangeEndereco} className={styles.rua} placeholder="Digite o nome da sua rua" value={endereco.rua}/>
              <label>Numero Residencial *: </label>
              <input type="text" name="numero" onChange={onChangeEndereco} className={styles.inputNumero} placeholder="XXX" value={endereco.numero}/>
            </div>
            <div className={styles.divNome}>
            <label>Bairro *: </label>
            <input type="text" name="bairro" onChange={onChangeEndereco} className={styles.inputs2} placeholder="Digite o nome de seu bairro" value={endereco.bairro}/>
            <label>Cidade *: </label>
            <input type="text" name="cidade" onChange={onChangeEndereco} className={styles.inputs2} placeholder="Digite o nome da sua cidade" value={endereco.cidade}/>
            <label>Complemento: </label>
            <input type="text" name="complemento" onChange={onChangeEndereco} className={styles.complemento} placeholder="Digite um complemento" value={endereco.complemento}/>
            </div> 
            <div>
              <hr />
              <label>Nome do Contato *: </label>
              <input type="text" name="nomeContato" className={styles.inputs3} placeholder="Contato Principal" onChange={onChange2}/>
              <label>Telefone *: </label>
              <input type="tel" name="telefone" className={styles.inputs3} placeholder="44999999999" onChange={onChange2}/>
              <label>Email *: </label>
              <input type="text" name="email"  className={styles.inputs3} placeholder="email123@email.com" onChange={onChange2}/>
              <Button type="button" variant="primary" onClick={adicionarContato}>
                Adicionar Contato
              </Button>
              {listaContatos.length === 0 && <p style={{color:"red"}}>Não há Nenhum contato, adicione no minimo 1 contato para salvar</p>}
              {listaContatos.map((element,key)=>{
                return(
                  <div class="card border-dark mb-3 mx-3" style={{ maxWidth: 500 }}>
                      <Row style={{paddingLeft:200 }}>
                         Contato {key+1}
                      </Row>
                      <Row style={{ paddingLeft: 30 }}>
                         Nome do Contato: {element.nomeContato}
                      </Row>
                      <Row style={{ paddingLeft: 30 }}>
                         Telefone: {element.telefone}
                      </Row>
                      <Row style={{ paddingLeft: 30 }}>
                         Email: {element.email}
                      </Row>
                      <button
                        type="button"
                        onClick={() => removerContato(element.nomeContato)}
                      >
                        Deletar
                      </button>
                  </div>
                )
              })}

            </div>
          
            <br/>
            {id?
              <button type="submit" disabled={listaContatos.length === 0}>Atualizar</button>
              :<button type="submit" disabled={listaContatos.length === 0}>Cadastrar</button>
            }
            
           
        </Form>
    </div>

  )
}
