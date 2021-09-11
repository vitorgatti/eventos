import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';


function Navbar(){
  
  const dispatch = useDispatch();
  return(
    <nav className="navbar navbar-expand-lg">
        <i class="fas fa-globe-americas text-white fa-2x"></i>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"> <Link classNameName="nav-link" to="/">Home</Link> </li>
            {
              useSelector(state => state.usuarioLogado) > 0 ?
              <>
                <li className="nav-item"> <Link classNameName="nav-link" to="">Publicar Evento</Link> </li>
                <li className="nav-item"> <Link classNameName="nav-link" to="">Meus Eventos</Link> </li>
                <li className="nav-item"> <Link classNameName="nav-link" to="" onClick={() => dispatch({type: 'LOG_OUT'})}>Sair</Link> </li>
              </>
              :
              <>  
                <li className="nav-item"> <Link classNameName="nav-link" to="novousuario">Cadastrar</Link> </li>
                <li className="nav-item"> <Link classNameName="nav-link" to="/login">Login</Link> </li>
              </>
            }
          </ul>
        </div>
    </nav>
  )
}

export default Navbar;