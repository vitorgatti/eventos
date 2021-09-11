import React, { useState } from 'react';
import { userSelector } from 'react-redux';
import './evento-cadastro.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';

import firebase from '../../config/firebase';

function EventoCadastro(){
  const  [msg, setMsgTipo] = useState();

  return(
    <>
    <Navbar/>
    <div className="col-12 mt-5">
      <div className="row">
        <h3 className="mx-auto fw-bold">Novo Evento</h3>
      </div>

      <form>
        <div className="form-group">
          <label>Titulo:</label>
          <input type="text" className="form-control"/>
        </div>

        <div className="form-group">
          <label>Tipo Evento:</label>
          <select className="form-control"> className="form-control" 
            <option disabled selected value>-- Selecione um tipo --</option>
            <option>Festa</option>
            <option>Teatro</option>
            <option>Show</option>
            <option>Evento</option>
          </select>
        </div>

        <div className="form-group">
          <label>Descrição do Evento:</label>
          <textarea className="form-control" rows="3"/>
        </div>

        <div className="form-group row">
          <div className="col-6">
            <label>Data:</label>
            <input type="date" className="form-control"/>
          </div>
          <div className="col-6">
            <label>Hora:</label>
            <input type="time" className="form-control"/>
          </div>
        </div>

        <div className="form-group">
          <label>Upload da Foto</label>
          <input type="file" className="form-control"/>
        </div>

        <button type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Publicar Evento</button>
      </form>

      <div className="msg-login text-center mt-2 text-center">
            {msg === 'sucesso' && <span><strong>Wow!</strong> Evento Publicado &#128526;</span>}
            {msg === 'erro' && <span><strong>Wow!</strong> Não foi possível publicar o evento! &#128546;</span>}
        </div>
    </div>
    </>
  )
}

export default EventoCadastro;
