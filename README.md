# Personify

Personify é uma aplicação completa de gerenciamento de pessoas que possui um frontend desenvolvido em React e um backend criado com Flask. Esta aplicação permite cadastrar, visualizar, editar e deletar informações de pessoas.

## Estrutura do Projeto
- `frontend`: Aplicação frontend desenvolvida em React.
- `backend`: Aplicação backend desenvolvida em Flask.

## Como Rodar o Projeto

### Pré-requisitos
- **Node.js** (para rodar o frontend)
- **Python** (para rodar o backend)
- **Git** (para versionamento)
- **MySQL** (para o banco de dados)

### Passo a Passo
1. **Clone o repositório**:
   ```bash
   git clone <URL do repositório>
   cd Personify

2. **Configuração do Backend**:
   - Vá até a pasta backend:
   ```cd backend```
   - Instale as dependências:
   ```pip install -r requirements.txt``` (Se for sua primeira vez usando o python, deve-se adicionar o python ao Path do windows...)
   - Configure o banco de dados conforme o arquivo ```config.py```.
   - Execute o comando para criar as tabelas:
   ```python app/database.py``` (Se for sua primeira vez usando o mysql, deve-se adicionar o mysql ao Path do windows...)
   - Inicie o backend:
   ```flask run```

3. **Configuração do Frontend**:
   - Vá até a pasta frontend:
   ```cd ../frontend```
   - Instale as dependências:
   ```npm install```
   - Inicie o frontend:
   ```npm start```

4. **Acesse a aplicação**:
   - Frontend: ```http://localhost:3000```
   - Backend: ```http://localhost:5000```

5. **Para rodar testes**:
   - **Frontend - Cypress**: Certifique-se de estar na pasta ```/frontend``` e execute o comando ```npx cypress open``` e utilize o arquivo ```personify.cy.js``` localizado na pasta ```/frontend/cypress/e2e/``` (Caso não dê certo, verifique se tem o cypress instalado)
   - **Backend - Pytest**: Certifique-se de estar na pasta ```/backend``` e execute o comando ```pytest``` (Caso não dê certo, verifique se tem o pytest instalado)