import sys
import os

# Adiciona o diretório principal da aplicação ao caminho de importação
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from app import create_app, db

@pytest.fixture
def app():
    """
    Configura a aplicação Flask para testes.
    - Cria uma instância da aplicação usando a configuração de teste.
    - Cria todas as tabelas do banco de dados antes dos testes.
    - Remove a sessão do banco de dados e apaga as tabelas após os testes.
    """
    app = create_app("config_test.py")
    with app.app_context():
        db.create_all()  # Cria todas as tabelas no banco de dados de teste
        yield app  # Fornece a aplicação para os testes
        db.session.remove()  # Remove a sessão do banco de dados
        db.drop_all()  # Apaga todas as tabelas do banco de dados

@pytest.fixture
def client(app):
    """
    Retorna um cliente de teste para enviar requisições à aplicação.
    """
    return app.test_client()
