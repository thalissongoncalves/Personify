import os
import mysql.connector
from mysql.connector import errorcode

# Obtém as configurações do banco de dados a partir de variáveis de ambiente ou usa valores padrão
host = os.getenv('DB_HOST', '127.0.0.1')
user = os.getenv('DB_USER', 'root')
password = os.getenv('DB_PASSWORD', '')

print("Conectando...")

# Tenta conectar ao servidor MySQL
try:
    conn = mysql.connector.connect(
        host=host,
        user=user,
        password=password
    )
except mysql.connector.Error as err:
    # Trata erros de conexão, como credenciais incorretas
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print('Existe algo errado no nome de usuário ou senha')
    else:
        print(err)

cursor = conn.cursor()

def create_database(cursor):
    """
    Cria o banco de dados `personify`, se não existir, e o usa.
    
    Args:
        cursor (mysql.connector.cursor): Cursor do MySQL usado para executar os comandos.
    """
    cursor.execute("DROP DATABASE IF EXISTS `personify`;")
    cursor.execute("CREATE DATABASE `personify`;")
    cursor.execute("USE `personify`;")

def create_tables(cursor):
    """
    Cria a tabela `pessoas` no banco de dados `personify`.
    
    Args:
        cursor (mysql.connector.cursor): Cursor do MySQL usado para executar os comandos.
    """
    tables = {
        'Pessoas': '''
        CREATE TABLE `pessoas` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `nome` varchar(50) NOT NULL,
            `email` varchar(40) NOT NULL,
            `data` varchar(10) NOT NULL,
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        '''
    }
    for table_name, table_sql in tables.items():
        try:
            print(f'Criando tabela {table_name}:', end=' ')
            cursor.execute(table_sql)
        except mysql.connector.Error as err:
            # Trata erros, como se a tabela já existir
            if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                print('Já existe')
            else:
                print(err.msg)
        else:
            print('OK')

def insert_data(cursor):
    """
    Insere dados iniciais na tabela `pessoas`.
    
    Args:
        cursor (mysql.connector.cursor): Cursor do MySQL usado para executar os comandos.
    """
    pessoas_sql = 'INSERT INTO pessoas (nome, email, data) VALUES (%s, %s, %s)'
    pessoas = [
        ('Thalisson', 'thalissongsilva70@gmail.com', '05/04/2002'),
        ('Shaiane', 'shaianesantos.pudim@gmail.com', '20/02/2003'),
    ]
    cursor.executemany(pessoas_sql, pessoas)
    print('Pessoas inseridas com sucesso!')
    
    # Exibe todas as pessoas na tabela `pessoas`
    cursor.execute('select * from personify.pessoas')
    print(' -------------  Pessoas:  -------------')
    for pessoa in cursor.fetchall():
        print(pessoa[1])

if __name__ == "__main__":
    """
    Executa o script principal para criar o banco de dados, tabelas, 
    inserir dados e encerrar a conexão com o banco de dados.
    """
    print("Conectando...")
    try:
        # Tenta conectar novamente ao servidor MySQL
        conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
    except mysql.connector.Error as err:
        # Trata erros de conexão, como credenciais incorretas
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print('Existe algo errado no nome de usuário ou senha')
        else:
            print(err)
    else:
        # Se a conexão for bem-sucedida, executa as funções de criação e inserção
        cursor = conn.cursor()
        create_database(cursor)
        create_tables(cursor)
        insert_data(cursor)
        conn.commit()  # Confirma as alterações no banco de dados
        cursor.close()  # Fecha o cursor
        conn.close()  # Fecha a conexão com o banco de dados
        print('Conexao encerrada com sucesso!')
