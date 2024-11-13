# Backend - Personify

Este é o backend da aplicação Personify, desenvolvido com Flask. Ele é responsável por gerenciar as requisições, realizar operações no banco de dados MySQL e servir a API para o frontend.

## Instalação
(Instruções detalhadas serão fornecidas posteriormente)

## API Endpoints

### 1. Listar Todas as Pessoas
- **Rota**: `/pessoas`
- **Método HTTP**: GET
- **Descrição**: Retorna uma lista de todas as pessoas cadastradas.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "nome": "Thalisson",
      "email": "thalissongsilva70@gmail.com",
      "data": "05/04/2002"
    }
  ]
- **Códigos de Status**: ```200 (SUCCESS)```

### 2. Criar uma Nova Pessoa
- **Rota**: `/pessoa`
- **Método HTTP**: POST
- **Descrição**: Cadastra uma nova pessoa.
- **Parâmetros de Entrada**:
  ```json
  {
    "nome": "string",
    "email": "string",
    "data": "string (no formato DD/MM/AAAA)"
  }
- **Resposta**:
  ```json
  {
    "message": "Nova pessoa cadastrada com sucesso!",
    "id": 1
  }
- **Resposta de Erro**:
  ```json
  {
    "error": "Dados incompletos fornecidos"
  }
- **Códigos de Status**: ```201 (Pessoa criada com sucesso)``` | ```400 (Dados incompletos ou erro de validação)```

### 3. Deletar uma Pessoa
- **Rota**: `/pessoa/<int:id>`
- **Método HTTP**: DELETE
- **Descrição**: Deleta uma pessoa com o ID fornecido.
- **Resposta**:
  ```json
  {
    "message": "Pessoa deletada com sucesso!"
  }
- **Códigos de Status**: ```200 (Pessoa deletada com sucesso)``` | ```404 (Pessoa não encontrada)```