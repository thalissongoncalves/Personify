from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Instância do banco de dados
db = SQLAlchemy()

def create_app(config_filename="config.py"):
    """
    Cria e configura a aplicação Flask.

    Args:
        config_filename (str): O nome do arquivo de configuração.

    Returns:
        Flask: A aplicação Flask configurada.
    """
    app = Flask(__name__)
    app.config.from_pyfile(config_filename)

    # Configuração do CORS
    CORS(app)

    # Inicializa a extensão do banco de dados
    db.init_app(app)

    # Importa e registra os Blueprints
    from app.routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app