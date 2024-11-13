from flask import Blueprint, jsonify, request
from app import db
from app.models import Pessoas

# Cria um Blueprint chamado 'main' para registrar as rotas da aplicação
main = Blueprint('main', __name__)

# Função auxiliar para converter uma instância de Pessoas em um dicionário JSON
def pessoa_to_json(pessoa):
    """
    Converte uma instância do modelo Pessoas em um dicionário JSON.
    
    Args:
        pessoa (Pessoas): Instância do modelo Pessoas.
    
    Returns:
        dict: Dicionário contendo os dados da pessoa.
    """
    return {
        "id": pessoa.id,
        "nome": pessoa.nome,
        "email": pessoa.email,
        "data": pessoa.data,
    }

# Função auxiliar para verificar se todos os campos necessários estão presentes nos dados
def verificar_dados(data, campos):
    """
    Verifica se os campos especificados estão presentes e não vazios nos dados fornecidos.
    
    Args:
        data (dict): Dicionário contendo os dados a serem verificados.
        campos (list): Lista de strings com os nomes dos campos obrigatórios.
    
    Returns:
        bool: True se todos os campos estiverem presentes, False caso contrário.
    """
    for campo in campos:
        if not data.get(campo):
            return False
    return True

# Rota para listar todas as pessoas
@main.route("/pessoas")
def pessoas():
    """
    Lista todas as pessoas cadastradas, ordenadas por ID.
    
    Returns:
        tuple: JSON contendo a lista de pessoas e o status HTTP 200.
    """
    pessoas = Pessoas.query.order_by(Pessoas.id).all()
    pessoas_json = [pessoa_to_json(pessoa) for pessoa in pessoas]
    return jsonify(pessoas_json), 200

# Rota para criar uma nova pessoa
@main.route("/pessoa", methods=["POST"])
def pessoa():
    """
    Cria uma nova pessoa a partir dos dados fornecidos no corpo da requisição.
    
    Returns:
        tuple: JSON com uma mensagem de sucesso e o ID da nova pessoa ou
               um erro se os dados forem incompletos ou se a pessoa já existir, 
               com o status HTTP apropriado.
    """
    data = request.get_json()
    if not verificar_dados(data, ["nome", "email", "data"]):
        return {"error": "Dados incompletos fornecidos"}, 400

    if Pessoas.query.filter_by(nome=data["nome"]).first():
        return {"error": "Essa pessoa já está cadastrada"}, 400

    nova_pessoa = Pessoas(nome=data["nome"], email=data["email"], data=data["data"])
    db.session.add(nova_pessoa)
    db.session.commit()
    
    return {"message": "Nova pessoa cadastrada com sucesso!", "id": nova_pessoa.id}, 201

# Rota para deletar uma pessoa por ID
@main.route("/pessoa/<int:id>", methods=["DELETE"])
def deletar(id):
    """
    Deleta uma pessoa com o ID especificado.
    
    Args:
        id (int): ID da pessoa a ser deletada.
    
    Returns:
        tuple: JSON com uma mensagem de sucesso se a pessoa for deletada ou
               um erro se a pessoa não for encontrada, com o status HTTP apropriado.
    """
    pessoa = db.session.get(Pessoas, id)
    if not pessoa:
        return {"error": "Erro ao deletar pessoa."}, 404

    db.session.delete(pessoa)
    db.session.commit()
    return {"message": f"{pessoa.nome} deletado(a) com sucesso!"}, 200

# Rota para buscar uma pessoa por ID
@main.route("/pessoa/<int:id>")
def buscar(id):
    """
    Busca e retorna uma pessoa com o ID especificado.
    
    Args:
        id (int): ID da pessoa a ser buscada.
    
    Returns:
        tuple: JSON com os dados da pessoa se encontrada ou
               um erro se a pessoa não for encontrada, com o status HTTP apropriado.
    """
    pessoa = Pessoas.query.filter_by(id=id).first()
    if not pessoa:
        return {"error": "Pessoa não encontrada."}, 404
    return jsonify([pessoa_to_json(pessoa)]), 200

# Rota para editar uma pessoa por ID
@main.route("/pessoa/<int:id>", methods=["PUT"])
def editar(id):
    """
    Edita os dados de uma pessoa com o ID especificado.
    
    Args:
        id (int): ID da pessoa a ser editada.
    
    Returns:
        tuple: JSON com uma mensagem de sucesso se a pessoa for editada ou
               um erro se a pessoa não for encontrada, com o status HTTP apropriado.
    """
    pessoa = db.session.get(Pessoas, id)
    if not pessoa:
        return {"error": "Pessoa não encontrada."}, 404

    data = request.get_json()
    # Atualiza os dados da pessoa apenas se novos valores forem fornecidos
    pessoa.nome = data.get("nome", pessoa.nome)
    pessoa.email = data.get("email", pessoa.email)
    pessoa.data = data.get("data", pessoa.data)

    db.session.commit()
    return {"message": f"{pessoa.nome} editado(a) com sucesso!"}, 200
