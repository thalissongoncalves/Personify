import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Pessoas from './pages/Pessoas';
import Cadastrar from './pages/Cadastrar';
import Editar from './pages/Editar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <ToastContainer />
      {/* Barra de navegação fixa no topo */}
      <nav class='navbar fixed-top navbar-expand-lg navbar-dark bg-dark p-3 text-center'>
        {/* Marca da aplicação */}
        <Link class='navbar-brand ms-2 mb-0' to='/'>
          <img src='./personify.png' width='30' height='30' class='d-inline-block align-top me-2' alt='Personify Logotipo Preto e Branco' />
          Personify
        </Link>
        {/* Botão de alternar para dispositivos móveis */}
        <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span class='navbar-toggler-icon'></span>
        </button>

        {/* Links de navegação */}
        <div class='collapse navbar-collapse center align-items-center' id='navbarSupportedContent'>
          <ul class='navbar-nav mr-auto'>
            <li class='nav-item active'>
              <Link class='nav-link' to='/'>Início</Link>
            </li>
            <li class='nav-item active'>
              <Link class='nav-link' to='/pessoas'>Pessoas</Link>
            </li>
          </ul>
          {/* Botão para adicionar nova pessoa */}
          <div class='container p-0 d-flex justify-content-center align-items-center'>
            <div class='row justify-content-center justify-content-lg-end p-0 col-12'>
              <button class='btn btn-light col-lg-3 col-6'>
                <Link class='nav-link' to='/pessoa'>Adicionar Pessoa</Link>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        {/* Rota para a página inicial */}
        <Route path='/' element={<Home />} />
        {/* Rota para a página que lista todas as pessoas */}
        <Route path='/pessoas' element={<Pessoas />} />
        {/* Rota para a página de cadastro de uma nova pessoa */}
        <Route path='/pessoa' element={<Cadastrar />} />
        {/* Rota para a página de edição de uma pessoa específica (identificada por um ID) */}
        <Route path='/pessoa/:id' element={<Editar />} />
      </Routes>
      

      {/* jQuery (necessário para o Bootstrap's JavaScript) */}
      <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>
      {/* Popper.js (necessário para a funcionalidade do dropdown do Bootstrap) */}
      <script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.6/umd/popper.min.js'></script>
      {/* JavaScript do Bootstrap */}
      <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'></script>
    </Router>
  );
}

export default App;