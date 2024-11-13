# Ativa o modo de teste no Flask, que desabilita alguns recursos e facilita o uso de testes unitários.
TESTING = True

# URI do banco de dados usada pelo SQLAlchemy para os testes.
# Aqui é usado o SQLite em um arquivo chamado `test.db`, que é adequado para testes por ser leve e fácil de configurar.
SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'

# Desativa o rastreamento de modificações no SQLAlchemy para melhorar o desempenho e evitar avisos desnecessários.
SQLALCHEMY_TRACK_MODIFICATIONS = False
