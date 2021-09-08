import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

import 'firebase/auth';
import firebase from '../../config/firebase';

function Login(){
  const  [email, setEmail] = useState();
  const  [senha, setSenha] = useState();
  const  [msg, setMsgTipo] = useState();

  function logar(){
    firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
      setMsgTipo('sucesso');
    }).catch(erro => {
      setMsgTipo('erro');
    });
  }

  return (
    <div className="login-content d-flex align-itens-center">    
      <form className="form-signin mx-auto">
      <div className='text-center mb-4'>
        <h1 className="h3 mb-3 text-white fw-bold">Login</h1>
      </div>      
        
        <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control my-2" id="inputEmail" placeholder="Email" />        
        <input onChange={(e) => setSenha(e.target.value)} type="password" class="form-control my-2" id="floatingPassword" placeholder="Senha" />
        
        <button onClick={logar} class="w-100 btn btn-lg btn-block btn-login" type="button">Logar</button>

        <div className="msg-login text-white text-center my-5 text-center">
            {msg === 'sucesso' && <span><strong>Wow!</strong> Você está conectado! &#128526;</span>}
            {msg === 'erro' && <span><strong>Wow!</strong> Verifique se a senha ou usuário estão corretos! &#128546;</span>}
        </div>

      <div className="opcoes-login mt-5 text-center">
        <a href="#" className="mx-2">Recuperar Senha</a>
        <span className="text-white">&#9733;</span>
        <Link to="novousuario" className="mx-2">Quero me Cadastrar</Link>
      </div>
    </form>
  </div>
  )
}

export default Login;