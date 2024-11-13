from app import db

class Pessoas(db.Model):
    """
    Modelo de dados para a tabela `pessoas`.

    A tabela `pessoas` armazena informações sobre as pessoas cadastradas,
    incluindo o ID único, nome, email e data de nascimento.

    Atributos:
        id (int): Identificador único da pessoa. É a chave primária da tabela
                  e é autoincrementada.
        nome (str): Nome da pessoa. Este campo é obrigatório e tem um limite de
                    50 caracteres.
        email (str): Endereço de email da pessoa. Este campo é obrigatório, tem
                     um limite de 40 caracteres e deve ser único (sem duplicatas).
        data (str): Data de nascimento da pessoa no formato `dd/mm/aaaa`. Este
                    campo é obrigatório e armazenado como uma string.
    """

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(40), nullable=False, unique=True)
    data = db.Column(db.String(10), nullable=False)

    def __repr__(self):
        """
        Retorna uma representação amigável da instância da classe Pessoas.

        Returns:
            str: Representação da pessoa no formato "<Pessoa {nome}>".
        """
        return f"<Pessoa {self.nome}>"
