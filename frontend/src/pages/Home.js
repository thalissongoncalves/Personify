import React from 'react';
import { Link } from 'react-router-dom';

function Home() {

    return (
        <div className='vh-100'>
            {/* Contêiner principal que ocupa 100% da altura da viewport */}
            <div className='container d-flex justify-content-center align-items-center h-100'>
                <div className='text-center'>
                    {/* Título da página */}
                    <h1>Bem-vindo ao Personify</h1>
                    {/* Parágrafo explicativo */}
                    <p>Gerencie seus dados de usuários e pessoas com facilidade.</p>
                    <div>
                        {/* Botão de navegação para a página de listagem de pessoas */}
                        <Link to='/pessoas' className='btn btn-dark'>Visualizar Dados</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;