import React, { useState } from "react";
import "./login.css";
import { Link, Redirect } from "react-router-dom";

import "firebase/auth";
import firebase from "../../config/firebase";

import { useSelector, useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msg, setMsgTipo] = useState();

  const dispatch = useDispatch();

  function logar() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then((resultado) => {
        setMsgTipo("sucesso");
        setTimeout(() => {
          dispatch({ type: "LOG_IN", usuarioEmail: email });
        }, 2000);
      })
      .catch((erro) => {
        setMsgTipo("erro");
      });
  }

  return (
    <div className="login-content d-flex align-itens-center">
      {useSelector((state) => state.usuarioLogado) > 0 ? (
        <Redirect to="/" />
      ) : null}

      <form className="form-signin mx-auto">
        <div className="text-center mb-4">
          <h1 className="h3 m-3 text-white fw-bold">Login</h1>
        </div>

        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control my-2"
          id="inputEmail"
          placeholder="Email"
        />
        <input
          onChange={(e) => setSenha(e.target.value)}
          type="password"
          className="form-control my-2"
          id="floatingPassword"
          placeholder="Senha"
        />

        <button
          onClick={logar}
          className="w-100 btn btn-lg btn-block btn-login"
          type="button"
        >
          Logar
        </button>

        <div className="msg-login text-white text-center my-5 text-center">
          {msg === "sucesso" && (
            <span>
              <strong>Wow!</strong> Você está conectado! &#128526;
            </span>
          )}
          {msg === "erro" && (
            <span>
              <strong>Wow!</strong> Verifique se a senha ou usuário estão
              corretos! &#128546;
            </span>
          )}
        </div>

        <div className="opcoes-login mt-5 text-center">
          <Link to="/usuariorecuperarsenha" className="mx-2">
            Recuperar Senha
          </Link>
          <span className="text-white">&#9733;</span>
          <Link to="novousuario" className="mx-2">
            Quero me Cadastrar
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
