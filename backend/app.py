import os
from app import create_app

# Cria a aplicação usando a configuração definida
app = create_app()

if __name__ == '__main__':
    # Usa variável de ambiente para definir o modo de depuração
    debug_mode = os.getenv('FLASK_DEBUG', 'True') == 'True'
    # Executa a aplicação no modo de depuração especificado
    app.run(debug=debug_mode)