import axios from 'axios';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import * as yup from "yup";
import MenuFixoDoTopo from '../../components/MenuFixoDoTop'
import styles from '../livro/CadastroLivro.module.css'
import {url} from '../../url/Url'

export default function CadastroLivro() {

  const[livro, setLivro] = useState({
     titulo: "",
     editora: "",
     isbn: "",
     autor: "",
     genero: ""
  }) 

  const[status, setStatus] = useState({
    tipo:"",
    mensagem:""
  })

  let schemaLivro = yup.object().shape({
    titulo: yup.string("Necessario preencher o campo titulo").required("Necessario preencher o campo titulo"),
    editora:  yup.string("Necessario preencher o campo editora").required("Necessario preencher o campo editora"),
    isbn: yup.string("Necessario preencher o campo isbn").required("Necessario preencher o campo isbn"),
    autor: yup.string("Necessario preencher o campo autor").required("Necessario preencher o campo autor"),
    genero: yup.string("Necessario preencher o campo genero").required("Necessario preencher o campo genero")

  });


  const handleSubmit = (event)=>{
    event.preventDefault();
    event.stopPropagation();
    schemaLivro.validate(livro).then(()=>{
      salvar()
    }).catch((erro)=>{
      setStatus({tipo:"erro",mensagem:""+erro})
    })
  }

  const onChange = (ev)=>{
    const { name, value } = ev.target;
    setLivro({ ...livro, [name]: value });
  }

  const salvar = ()=>{
    axios.post(url+"/livro",{
      titulo: livro.titulo,
      autor: livro.autor,
      editora: livro.editora,
      genero: livro.genero,
      isbn: livro.isbn
    }).then(()=>{
      setStatus({tipo:"sucesso",mensagem:"cadastro realizado com sucesso"})
    }).catch((erro)=>{
      alert(erro)
    })
  }

  return (
    <div>
       <MenuFixoDoTopo
          nomeTela={"Cadastro de Livro"}
       />

        <form  onSubmit={handleSubmit} >
            {status.tipo==="erro"? <p style={{color:"red"}}>{status.mensagem}</p>:null}
            {status.tipo==="sucesso"? <p style={{color:"green"}}>{status.mensagem}</p>:null}
            <div className={styles.form}>
              <div>
                <label>Título *: </label>
                <input type="text" name="titulo" onChange={onChange} placeholder="Digite o nome do livro" className={styles.input}/>
              </div>
              <div>
                <label>Autor *: </label>
                <input type="text" name="autor" onChange={onChange} placeholder="Digite o nome do autor" className={styles.input}/><br/>
              </div>
              <div>
                <label>Editora *: </label>
                <input type="text" name="editora" onChange={onChange} placeholder="Digite o nome da editora"className={styles.input} />
              </div>
              <div>
                <label>Gênero *: </label>
                <input type="text" name="genero" onChange={onChange} placeholder="Digite o gênero do livro" className={styles.input}/><br/>
              </div>
              <div>
                <label>ISBN *: </label>
                <input type="text" name="isbn" onChange={onChange} placeholder="Digite o isbn do livro" className={styles.input}/><br/>
              </div>
              <div>
                
              </div>
            </div>
            <button type="submit" >Cadastrar</button>
        </form>
    </div>
  )
}
