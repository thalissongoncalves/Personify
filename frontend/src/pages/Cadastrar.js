import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

function Cadastrar() {
    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        data: '',
    });

    // Função para lidar com mudanças nos campos do formulário
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value }); // Atualiza o estado com os novos valores
    }

    // Função para lidar com o envio do formulário
    async function handleSubmit(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        try {
            // Formata a data no formato dd/mm/yyyy antes de enviar
            const splitDate = formData.data.split('-');
            const formattedDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
            const dataToSend = {
                ...formData,
                data: formattedDate,
            };
            // Envia a solicitação POST para o backend
            await axios.post('http://localhost:5000/pessoa', dataToSend);
            toast.success('Pessoa cadastrada com sucesso!');
        } catch (error) {
            // Trata os erros da solicitação
            if (error.response && error.response.data) {
                toast.error(`Erro: ${error.response.data.error}`);
            } else {
                toast.error('Erro: Ocorreu um erro inesperado.');
            }
        }
    }

    return (
        <div className='mt-5 mx-3 pt-4'>
            <h1 className='mt-3'>Cadastrar nova pessoa</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    {/* Campo de entrada para o nome */}
                    <div className='form-group'>
                        <label htmlFor='nome'>Nome</label>
                        <input type='text' id='nome' name='nome' className='form-control' placeholder='Nome' value={formData.nome} onChange={handleChange} />
                    </div>
                    {/* Campo de entrada para o email */}
                    <div className='form-group mt-2'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' className='form-control' placeholder='name@example.com' value={formData.email} onChange={handleChange} />
                    </div>
                    {/* Campo de entrada para a data de nascimento */}
                    <div className='form-group mt-2'>
                        <label htmlFor='data'>Data de Nascimento</label>
                        <input type='date' id='data' name='data' className='form-control' placeholder='01/01/2000' value={formData.data} onChange={handleChange}/>
                    </div>
                    {/* Botão para salvar os dados */}
                    <button type='submit' className='btn btn-dark btn-salvar mt-3'>Salvar</button>
                    {/* Link para voltar à página de listagem */}
                    <Link className='btn btn-dark mt-3 ms-3' to={`/pessoas`}>Voltar</Link>
                </fieldset>
            </form>
        </div>
    );
}

export default Cadastrar;