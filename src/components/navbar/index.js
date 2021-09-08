import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar(){
  return(
    <nav className="navbar navbar-expand-lg">
      <span  className="navbar-brand text-white fw-bold" href="#">Eventos</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-caret-square-down text-white"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"> <Link classNameName="nav-link" to="/">Home</Link> </li>
            <li className="nav-item"> <Link classNameName="nav-link" to="novousuario">Cadastrar</Link> </li>
            <li className="nav-item"> <Link classNameName="nav-link" to="/login">Login</Link> </li>
          </ul>
        </div>
    </nav>
  )
}

export default Navbar;