import React from 'react';
import './login.css'

function Login(){
  return (
    <div className="login-content d-flex align-itens-center">    
      <form className="form-signin mx-auto">
      <div className='text-center mb-4'>
        <h1 className="h3 mb-3 text-white fw-bold">Login</h1>
      </div>      
        
        <input type="email" class="form-control my-2" id="inputEmail" placeholder="Email" />        
        <input type="password" class="form-control my-2" id="floatingPassword" placeholder="Senha" />
        
        <button class="w-100 btn btn-lg btn-block btn-login" type="submit">Sign in</button>

        <div className="msg-login text-white text-center my-5 text-center">
          <span><strong>Wow!</strong> Você está conectado! &#128526;</span>
          <br/>
          <span><strong>Wow!</strong> Verifique se a senha ou usuário estão corretos! &#128546;</span>
        </div>

      <div className="opcoes-login mt-5 text-center">
        <a href="#" className="mx-2">Recuperar Senha</a>
        <span className="text-white">&#9733;</span>
        <a href="#" className="mx-2">Quero me Cadastrar</a>
      </div>
    </form>
  </div>
  )
}

export default Login;