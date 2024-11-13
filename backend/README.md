# Backend - Personify

Este é o backend da aplicação Personify, desenvolvido com Flask. Ele é responsável por gerenciar as requisições, realizar operações no banco de dados MySQL e servir a API para o frontend.

## Instalação

### Pré-requisitos
- **Python** instalado (versão 3.7+)
- **MySQL** configurado

### Passo a Passo
1. **Instale as dependências**:
   ```bash
   pip install -r requirements.txt

2. **Configuração do Banco de Dados**:
   - Configure o banco de dados no arquivo ```config.py``` com suas credenciais de MySQL.
   - Execute o script ```database.py``` para criar as tabelas.

3. **Inicie o Servidor**:
   ```bash
   flask run

## Tecnologias utilizadas para Testes
- **Pytest**: Certifique-se de estar na pasta ```/backend``` e execute o comando ```pytest``` (Caso não dê certo, verifique se tem o pytest instalado)

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