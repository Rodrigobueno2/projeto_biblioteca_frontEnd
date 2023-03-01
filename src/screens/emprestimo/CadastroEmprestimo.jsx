import React, { useEffect, useState } from 'react'
import MenuFixoDoTopo from '../../components/MenuFixoDoTop'
import styles from '../emprestimo/CadastroEmprestimo.module.css'
import * as yup from "yup";
import axios from 'axios';
import { url } from '../../url/Url';

export default function CadastroEmprestimo() {

  const [usuarios, setUsuarios] = useState([]);
  const [livros, setLivros] = useState([]);
  const [emprestimo,setEmprestimo] = useState({
    dataEmprestimo: "",
    dataDevolucao: ""
  })
  const [usuario, setUsuario] = useState("");
  const [livro, setLivro] = useState("");
  const [status, setStatus] = useState({
    tipo:"",
    mensagem:""
  })

 
  useEffect(()=>{
     obterUsuarios();
     obterLivros();
     
     
  },[])

  useEffect(()=>{
   
  },[usuarios])
  

  const obterUsuarios = () =>{
    axios.get(url+"/usuario").then((element)=>{
      setUsuarios(element.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const obterLivros = () =>{
    axios.get(url+"/livro").then((element)=>{
      setLivros(element.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  let schemaEmprestimo = yup.object().shape({
    dataEmprestimo: yup.string("Necessario preencher a data de empréstimo").required("Necessario preencher a data de empréstimo"),
    dataDevolucao:  yup.string("Necessario preencher a data de devolução").required("Necessario preencher a data de devolução"),

  });

  const handleUsuarioUpdate = (event)=>{
     setUsuario(event.target.value);
  }

  const handleLivroUpdate = (event)=>{
     setLivro(event.target.value);
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    event.stopPropagation();
    schemaEmprestimo.validate(emprestimo).then(()=>{
      if(usuario!==""){
         if(livro!==""){
            setStatus({tipo:"sucesso"})
            salvar();
         }else{
            setStatus({tipo:"erro",mensagem:"Selecione o livro"});
         }
      }else{
        setStatus({tipo:"erro",mensagem:"Selecione o usuario"});
      }
    }).catch((erro)=>{
        setStatus({tipo:"erro",mensagem:" "+erro});
    })
    
  }

  const onChange = (ev)=>{
    const { name, value } = ev.target;
    setEmprestimo({ ...emprestimo, [name]: value });
  }

  const salvar = () =>{
     axios.post(url+"/emprestimo",{
        dataEmprestimo: emprestimo.dataEmprestimo,
        dataDevolucao: emprestimo.dataDevolucao,
        livro:{
           id: livro
        },
        usuario:{
           id: usuario
        }
     }).then(()=>{
       setStatus({tipo:"sucesso", mensagem:"Cadastrado com sucesso"})
     }).catch((err)=>{
       console.log(err);
     })
  }

  
  return (
    <div>
        <MenuFixoDoTopo
          nomeTela={"Cadastro de Empréstimo"}
        />
        {status.tipo==="erro"? <p style={{color:"red"}}>{status.mensagem}</p>:null}
        {status.tipo==="sucesso"? <p style={{color:"green"}}>{status.mensagem}</p>:null}
        {usuarios && livros?
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
                <div>
                    <label>Data de empréstimo: *</label>
                      <input type="date" className={styles.input} name="dataEmprestimo" onChange={onChange}/>
                </div>
                <div>
                    <label>Data de entrega do empréstimo: *</label>
                    <input type="date" className={styles.input} name="dataDevolucao" onChange={onChange}/>
                </div>
                <div>
                  <label>Usuário: *</label>
                  <select onChange={handleUsuarioUpdate} className={styles.select}>
                    <option value="">Selecione uma opção</option>
                        {usuarios.map((element)=>(
                
                        <option key={element._id}  value={element._id}>{element._id} - {element.nome}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label>Livro: *</label>
                  <select onChange={handleLivroUpdate} className={styles.select}>
                    <option value="">Selecione uma opção</option>
                        {livros.map((element)=>(
                
                        <option key={element._id}  value={element._id}>{element._id} - {element.titulo}</option>
                      ))}
                  </select>
                </div>
            </div>
            <button type="submit" >Cadastrar</button>
          </form>
        :null}
        
    </div>
  )
}
