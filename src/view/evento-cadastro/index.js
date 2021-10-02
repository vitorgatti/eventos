import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./evento-cadastro.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";

import firebase from "../../config/firebase";

function EventoCadastro(props) {
  const [carregando, setCarregando] = useState();
  const [msg, setMsgTipo] = useState();
  const [titulo, setTitulo] = useState();
  const [tipo, setTipo] = useState();
  const [detalhes, setDetalhes] = useState();
  const [data, setData] = useState();
  const [hora, setHora] = useState();
  const [fotoAtual, setFotoAtual] = useState();
  const [fotoNova, setFotoNova] = useState();
  const usuarioEmail = useSelector((state) => state.usuarioEmail);

  const storage = firebase.storage();
  const db = firebase.firestore();

  useEffect(() => {
    firebase
      .firestore()
      .collection("eventos")
      .doc(props.match.params.id)
      .get()
      .then((resultado) => {
        setTitulo(resultado.data().titulo);
        setTipo(resultado.data().tipo);
        setDetalhes(resultado.data().detalhes);
        setData(resultado.data().data);
        setHora(resultado.data().hora);
        setFotoAtual(resultado.data().foto);
      });
  }, [carregando]);

  function atualizar() {
    setMsgTipo(null);
    setCarregando(1);

    if (fotoNova) {
      storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);
    }

    db.collection("eventos")
      .doc(props.match.params.id)
      .update({
        titulo: titulo,
        tipo: tipo,
        detalhes: detalhes,
        data: data,
        hora: hora,
        foto: fotoNova ? fotoNova.name : fotoAtual,
      })
      .then(() => {
        setMsgTipo("sucesso");
        setCarregando(0);
      })
      .catch((erro) => {
        setMsgTipo("erro");
        setCarregando(0);
      });
  }

  function cadastrar() {
    setMsgTipo(null);

    storage
      .ref(`imagens/${fotoNova.name}`)
      .put(fotoNova)
      .then(() => {
        setCarregando(1);

        db.collection("eventos")
          .add({
            titulo: titulo,
            tipo: tipo,
            detalhes: detalhes,
            data: data,
            hora: hora,
            usuario: usuarioEmail,
            visualizacoes: 0,
            foto: fotoNova.name,
            publico: 1,
            criacao: new Date(),
          })
          .then(() => {
            setMsgTipo("sucesso");
            setCarregando(0);
          })
          .catch((erro) => {
            setMsgTipo("erro");
            setCarregando(0);
          });
      });
  }

  return (
    <>
      <Navbar />
      <div className="col-12 mt-5">
        <div className="row">
          <h3 className="mx-auto fw-bold">
            {props.match.params.id ? "Atualizar Evento" : "Novo Evento"}
          </h3>
        </div>

        <form>
          <div className="form-group">
            <label>Titulo:</label>
            <input
              onChange={(e) => setTitulo(e.target.value)}
              type="text"
              className="form-control"
              value={titulo && titulo}
            />
          </div>

          <div className="form-group">
            <label>Tipo Evento:</label>
            <select
              onChange={(e) => setTipo(e.target.value)}
              className="form-control"
              value={tipo && tipo}
            >
              {" "}
              className="form-control"
              <option disabled selected value>
                -- Selecione um tipo --
              </option>
              <option>Festa</option>
              <option>Teatro</option>
              <option>Show</option>
              <option>Evento</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descrição do Evento:</label>
            <textarea
              onChange={(e) => setDetalhes(e.target.value)}
              className="form-control"
              rows="3"
              value={detalhes && detalhes}
            />
          </div>

          <div className="form-group row">
            <div className="col-6">
              <label>Data:</label>
              <input
                onChange={(e) => setData(e.target.value)}
                type="date"
                className="form-control"
                value={data && data}
              />
            </div>
            <div className="col-6">
              <label>Hora:</label>
              <input
                onChange={(e) => setHora(e.target.value)}
                type="time"
                className="form-control"
                value={hora && hora}
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Upload da Foto{" "}
              {props.match.params.id
                ? "(caso queira manter a mesma foto, não precisa escolher uma nova imagem!)"
                : null}
            </label>
            <input
              onChange={(e) => setFotoNova(e.target.files[0])}
              type="file"
              className="form-control"
            />
          </div>
          <div className="mx-auto row">
            {carregando > 0 ? (
              <div className="spinner-border text-danger mx-auto" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <button
                onClick={props.match.params.id ? atualizar : cadastrar}
                type="button"
                className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
              >
                {props.match.params.id ? "Atualizar" : "Publicar Evento"}
              </button>
            )}
          </div>
        </form>

        <div className="msg-login text-center mt-2 text-center">
          {msg === "sucesso" && (
            <span>
              <strong>Wow!</strong> Evento Publicado &#128526;
            </span>
          )}
          {msg === "erro" && (
            <span>
              <strong>Wow!</strong> Não foi possível publicar o evento!
              &#128546;
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default EventoCadastro;
