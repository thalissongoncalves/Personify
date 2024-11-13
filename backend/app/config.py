import os

# Chave secreta para a aplicação Flask, usada para proteger sessões e cookies.
# Se a variável de ambiente `SECRET_KEY` não estiver definida, usa um valor padrão.
SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')

# URI do banco de dados usada pelo SQLAlchemy para se conectar ao banco.
# A URI é formatada usando variáveis de ambiente para garantir flexibilidade e segurança.
SQLALCHEMY_DATABASE_URI = "{SGBD}://{usuario}:{senha}@{servidor}/{database}".format(
    SGBD=os.getenv('SGBD', 'mysql+mysqlconnector'),  # Sistema de Gerenciamento de Banco de Dados (SGBD), padrão: MySQL
    usuario=os.getenv('DB_USER', 'root'),            # Usuário do banco de dados, padrão: root
    senha=os.getenv('DB_PASSWORD', ''),              # Senha do banco de dados, padrão: vazio
    servidor=os.getenv('DB_HOST', 'localhost'),      # Servidor do banco de dados, padrão: localhost
    database=os.getenv('DB_NAME', 'personify')       # Nome do banco de dados, padrão: personify
)
