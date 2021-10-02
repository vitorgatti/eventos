import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import firebase from '../../config/firebase'
import EventoCard from '../../components/evento-card';
import { useSelector } from 'react-redux';

function Home({match}){
  const [eventos, setEventos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const usuarioEmail = useSelector(state => state.usuarioEmail); 
  let listaEventos = [];

  useEffect(() => {
    if (match.params.parametro){
      firebase.firestore().collection('eventos').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
        await resultado.docs.forEach(doc => {
          if(doc.data().titulo.toLowerCase().indexOf(pesquisa.toLowerCase()) >= 0)
          {
            listaEventos.push({
              id:doc.id,
              ...doc.data()
            });
          }
        });
  
        setEventos(listaEventos);
      });
    } else{
      firebase.firestore().collection('eventos').get().then(async (resultado) => {
        await resultado.docs.forEach(doc => {
          if(doc.data().titulo.toLowerCase().indexOf(pesquisa.toLowerCase()) >= 0)
          {
            listaEventos.push({
              id:doc.id,
              ...doc.data()
            });
          }
        });
  
        setEventos(listaEventos);
      });
    }
  });

  return(
    <>
      <Navbar/>
      <div className="row p-2">
        <h2 className="mx-auto p-5">Eventos Publicados</h2>
        <input onChange={(e) => setPesquisa(e.target.value)} className="form-control text-center" type="text" placeholder="Pesquisar pelo título..."/>
      </div>
      
      <div className="row p-3">
        {eventos.map(item => <EventoCard id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes}/>) }
      </div>
    </>
  )
}

export default Home;