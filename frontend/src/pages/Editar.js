import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

function Editar() {
    // Estados para armazenar os dados da pessoa
    const [peopleId, setId] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState('');
    const { id } = useParams(); // Obtém o ID da pessoa a partir da URL
    const location = useLocation(); // Obtém o estado de navegação
    const [isEditing, setIsEditing] = useState(location.state?.isEditing || false);

    // useEffect para buscar os dados da pessoa ao carregar o componente
    useEffect(() => {
        async function fetchPessoas() {
            try {
                // Requisição GET para buscar os dados da pessoa pelo ID
                const response = await api.get(`/pessoa/${id}`);
                setId(response.data[0].id);
                setNome(response.data[0].nome);
                setEmail(response.data[0].email);
                // Formata a data de dd/mm/yyyy para yyyy-mm-dd
                const dateParts = response.data[0].data.split('/');
                const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
                setData(formattedDate);
            } catch (error) {
                // Tratamento de erros com mensagens amigáveis
                if (error.response && error.response.data) {
                    toast.error(`Erro: ${error.response.data.error}`);
                } else {
                    toast.error('Erro: Ocorreu um erro inesperado.');
                }
            }
        }

        fetchPessoas();
    }, [id]); // Dependência do ID para recarregar quando ele mudar

    // Função para editar os dados da pessoa
    async function editPeople(e) {
        try {
            e.preventDefault(); // Previne o comportamento padrão do formulário
            // Formata a data de yyyy-mm-dd para dd/mm/yyyy
            const dateParts = data.split('-');
            const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            const dataToSend = {
                nome: nome,
                email: email,
                data: formattedDate,
            };

            // Requisição PUT para atualizar os dados da pessoa
            await api.put(`/pessoa/${id}`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            toast.success('Pessoa editada com sucesso!');  // Mensagem de sucesso
        } catch (error) {
            // Tratamento de erros com mensagens amigáveis
            if (error.response && error.response.data) {
                toast.error(`Erro: ${error.response.data.error}`);
            } else {
                toast.error('Erro: Ocorreu um erro inesperado.');
            }
        }
    }

    // Função para ativar o modo de edição
    function handleEditClick() {
        setIsEditing(true);
    }

    // Função para cancelar o modo de edição
    function handleCancelEdit() {
        setIsEditing(false);
    }

    // Formatação da data para exibição
    const dateParts = data.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    return (
        <div className='mt-5 mx-3 pt-4'>
            {/* Exibe os detalhes da pessoa ou o formulário de edição */}
            {!isEditing ? (
                <div className='alert alert-info mt-3'>
                    <h1>Pessoa encontrada:</h1>
                    <ul>
                        <li><strong>ID:</strong> {peopleId}</li>
                        <li><strong>Nome:</strong> { nome }</li>
                        <li><strong>Email:</strong> { email }</li>
                        <li><strong>Data de Nascimento:</strong> { formattedDate }</li>
                    </ul>
                    <button className='btn btn-dark btn-salvar me-3' onClick={handleEditClick}>Editar</button>
                    <button className='btn btn-dark btn-salvar' onClick={() => window.history.back()}>Voltar</button>
                </div>
            ) : (
                <div>
                    <h1 className='mt-3'>Editar informação</h1>
                    <form onSubmit={(e) => editPeople(e)}>
                        <fieldset>
                            {/* Campo de entrada para o nome */}
                            <div className='form-group'>
                                <label htmlFor='nome'>Nome</label>
                                <input type='text' id='nome' name='nome' className='form-control' value={nome} onChange={(e) => setNome(e.target.value)} />
                            </div>
                            {/* Campo de entrada para o email */}
                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input type='email' id='email' name='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            {/* Campo de entrada para a data de nascimento */}
                            <div className='form-group'>
                                <label htmlFor='data_nascimento'>Data de Nascimento</label>
                                <input type='date' id='data' name='data' className='form-control' value={data} onChange={(e) => setData(e.target.value)}/>
                            </div>
                            {/* Botões de salvar e cancelar */}
                            <button type='submit' className='btn btn-dark btn-salvar mt-3'>Salvar</button>
                            <button type='button' className='btn btn-secondary mt-3 ms-2' onClick={handleCancelEdit}>Cancelar</button>
                        </fieldset>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Editar;