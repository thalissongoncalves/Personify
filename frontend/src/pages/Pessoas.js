import React from 'react';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Pessoas() {
    // Estado para armazenar a lista de pessoas
    const [pessoas, setPessoas] = useState([]);
    const navigate = useNavigate(); // Hook para navegar entre as páginas

    // useEffect para buscar os dados das pessoas quando o componente é montado
    useEffect(() => {
        async function fetchPessoas() {
            const response = await api.get('/pessoas'); // Faz a requisição GET para a API
            setPessoas(response.data); // Atualiza o estado com os dados recebidos
        }

        fetchPessoas(); // Chama a função para buscar os dados
    }, []);

    // Função para deletar uma pessoa pelo ID
    async function deletePeople(id) {
        try {
            await api.delete(`/pessoa/${id}`); // Faz a requisição DELETE para a API
            const response = await api.get('/pessoas'); // Atualiza a lista de pessoas após deletar
            setPessoas(response.data); // Atualiza o estado com a nova lista
            toast.success('Pessoa deletada com sucesso!'); // Exibe mensagem de sucesso
        } catch (error) {
            // Trata os erros da requisição
            if (error.response && error.response.data) {
                toast.error(`Erro: ${error.response.data.error}`);
            } else {
                toast.error('Erro: Ocorreu um erro inesperado.');
            }
        }
    }

    // Função para navegar para a página de detalhes da pessoa
    function handleNameClick(id) {
        navigate(`/pessoa/${id}`, { state: { isEditing: false } });
    }

    // Função para navegar para a página de edição da pessoa
    function handleEditClick(id) {
        navigate(`/pessoa/${id}`, { state: { isEditing: true } });
    }

    return (
        <div className='mt-5 mx-3 pt-4'>
            <h1 className='text-lg-center my-3'>Lista de Pessoas</h1>
            {/* Tabela para exibir a lista de pessoas */}
            <table className='table table-striped table-responsive table-bordered'>
                <thead className='thead-default'>
                    <tr className='text-center'>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Data de Nascimento</th>
                        <th></th> {/* Coluna para os botões de ação */}
                    </tr>
                </thead>
                <tbody>
                    {/* Mapeia a lista de pessoas e exibe cada uma em uma linha da tabela */}
                    {pessoas.map((pessoa) => (
                        <tr key={pessoa.id} className='text-center align-middle'>
                            <td>
                                {/* Botão para ver mais detalhes da pessoa */}
                                <button className='btn btn-link text-dark' onClick={() => handleNameClick(pessoa.id)}>{pessoa.nome}</button>
                            </td>
                            <td>{pessoa.email}</td>
                            <td>{pessoa.data}</td>
                            <td>
                                <div className='d-flex justify-content-center'>
                                    {/* Botão para editar a pessoa */}
                                    <button className='btn btn-dark me-2' onClick={() => handleEditClick(pessoa.id)}>Editar</button>
                                    {/* Botão para deletar a pessoa */}
                                    <button className='btn btn-dark' onClick={() => deletePeople(pessoa.id)}>Deletar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Pessoas;