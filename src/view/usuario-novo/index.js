import React, { useState } from "react";

import firebase from '../../config/firebase';
import 'firebase/auth';

import './usuario-novo.css'

import Navbar from '../../components/navbar';

function NovoUsuario(){
  const  [email, setEmail] = useState();
  const  [senha, setSenha] = useState();
  const  [msgTipo, setMsgTipo] = useState();
  const  [msg, setMsg] = useState();
  const  [carregando, setCarregando] = useState();

  function Cadastrar(){
    setCarregando(1);
    setMsg(null);

    if(!email || !senha) {
      setMsgTipo('erro')
      setMsg('É necessário informar o e-mail e senha para fazer o cadastro!')
      setCarregando(0);
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado => 
      {
        setCarregando(0);
        setMsgTipo('sucesso')
      }).catch (erro =>  {
        setCarregando(0);
        setMsgTipo('erro')
        setMsg(erro.message);
      });
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="form-cadastro">
        <form className="text-center form-login mx-auto mt-5">
          <h1 className="h3 mb-3 text-black fw-bold"> Cadastro </h1>
          
          <input onChange={(e) => setEmail(e.target.value)} className="form-control my-2" type="email" placeholder="Email"></input>
          <input onChange={(e) => setSenha(e.target.value)} className="form-control my-2" type="password" placeholder="Senha"></input>

          {
            carregando ? <div class="spinner-border text-danger mt-5" role="status"><span class="sr-only"></span></div> :
            <button onClick={Cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
          }
          
          <div className="msg-login text-black text-center my-5 text-center">
              {msgTipo === 'sucesso' && <span><strong>Wow!</strong> Usuário cadastrado com sucesso! &#128526;</span>}
              {msgTipo === 'erro' && <span><strong>Ops!</strong> {msg} &#128546;</span>}
              
          </div>
        </form>
      </div>
    </>
  )
}

export default NovoUsuario;