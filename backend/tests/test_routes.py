def test_get_all(client):
    # Testa a obtenção de todas as pessoas cadastradas na API

    # Cria duas pessoas na base de dados para garantir que haja registros
    client.post('/pessoa', json={
        'nome': 'Thálisson Gonçalves',
        'email': 'thalissongsilva70@gmail.com',
        'data': '2002-04-05'
    })
    client.post('/pessoa', json={
        'nome': 'Maria Silva',
        'email': 'maria.silva@example.com',
        'data': '1995-08-12'
    })
    
    # Faz uma requisição GET para obter todas as pessoas
    response = client.get('/pessoas')
    assert response.status_code == 200  # Verifica se o status da resposta é 200 (OK)
    data = response.get_json()  # Converte a resposta para JSON
    assert len(data) >= 2  # Verifica se há pelo menos 2 pessoas na resposta
    assert data[0]['nome'] == 'Thálisson Gonçalves'  # Verifica se a primeira pessoa é a correta
    assert data[1]['nome'] == 'Maria Silva'  # Verifica se a segunda pessoa é a correta

def test_create_person_201(client):
    # Testa a criação de uma nova pessoa na API

    # Envia uma requisição POST para criar uma pessoa
    response = client.post('/pessoa', json={
        'nome': 'Thálisson Gonçalves',
        'email': 'thalissongsilva70@gmail.com',
        'data': '2002-04-05'
    })
    assert response.status_code == 201  # Verifica se o status da resposta é 201 (Criado)
    data = response.get_json()  # Converte a resposta para JSON
    assert data['message'] == 'Nova pessoa cadastrada com sucesso!'  # Verifica a mensagem de sucesso

def test_create_person_missing_data_400(client):
    # Testa a criação de uma pessoa com dados incompletos

    # Envia uma requisição POST com o nome vazio
    response = client.post('/pessoa', json={
        'nome': '',
        'email': 'thalissongsilva70@gmail.com',
        'data': '2002-04-05'
    })
    assert response.status_code == 400  # Verifica se o status da resposta é 400 (Bad Request)
    data = response.get_json()  # Converte a resposta para JSON
    assert data['error'] == 'Dados incompletos fornecidos'  # Verifica a mensagem de erro

def test_create_person_duplicate_400(client):
    # Testa a criação de uma pessoa duplicada

    # Cria uma pessoa inicialmente
    client.post('/pessoa', json={
        'nome': 'Thálisson Gonçalves',
        'email': 'thalissongsilva70@gmail.com',
        'data': '2002-04-05'
    })
    
    # Tenta criar a mesma pessoa novamente
    response = client.post('/pessoa', json={
        'nome': 'Thálisson Gonçalves',
        'email': 'thalissongsilva70@gmail.com',
        'data': '2002-04-05'
    })
    assert response.status_code == 400  # Verifica se o status da resposta é 400 (Bad Request)
    data = response.get_json()  # Converte a resposta para JSON
    assert data['error'] == 'Essa pessoa já está cadastrada'  # Verifica a mensagem de erro

def test_delete_person_200(client):
    # Testa a deleção de uma pessoa existente na API

    # Cria uma pessoa para deletar
    response = client.post('/pessoa', json={
        'nome': 'Thálisson Gonçalves',
        'email': 'thalissongsilva70@gmail.com',
        'data': '2002-04-05'
    })
    assert response.status_code == 201  # Verifica se a pessoa foi criada com sucesso
    created_person = response.get_json()  # Obtém os dados da pessoa criada
    print("Pessoa criada:", created_person)

    person_id = created_person['id']  # Obtém o ID da pessoa criada

    # Deleta a pessoa usando o ID
    response = client.delete(f'/pessoa/{person_id}')
    assert response.status_code == 200  # Verifica se o status da resposta é 200 (OK)
    data = response.get_json()  # Converte a resposta para JSON
    assert data['message'] == 'Thálisson Gonçalves deletado(a) com sucesso!'  # Verifica a mensagem de sucesso

def test_delete_person_404(client):
    # Testa a deleção de uma pessoa que não existe

    # Tenta deletar uma pessoa com um ID que não existe
    response = client.delete('/pessoa/99999')
    assert response.status_code == 404  # Verifica se o status da resposta é 404 (Não Encontrado)
    data = response.get_json()  # Converte a resposta para JSON
    assert data['error'] == 'Erro ao deletar pessoa.'  # Verifica a mensagem de erro

def test_search_person_200(client):
    # Testa a busca de uma pessoa existente na API

    # Cria uma pessoa para buscar
    response = client.post('/pessoa', json={
        'nome': 'Thálisson Gonçalves',
        'email': 'thalissongsilva70@gmail.com',
        'data': '2002-04-05'
    })
    assert response.status_code == 201  # Verifica se a pessoa foi criada com sucesso
    created_person = response.get_json()  # Obtém os dados da pessoa criada
    print("Pessoa criada:", created_person)

    person_id = created_person['id']  # Obtém o ID da pessoa criada

    # Faz uma requisição GET para buscar a pessoa
    response = client.get(f'/pessoa/{person_id}')
    assert response.status_code == 200  # Verifica se o status da resposta é 200 (OK)

def test_edit_person_200(client):
    # Testa a edição de uma pessoa existente na API

    # Cria uma pessoa para editar
    response = client.post('/pessoa', json={
        'nome': 'Thálisson Gonçalves',
        'email': 'thalissongsilva70@gmail.com',
        'data': '2002-04-05'
    })
    assert response.status_code == 201  # Verifica se a pessoa foi criada com sucesso
    created_person = response.get_json()  # Obtém os dados da pessoa criada
    print("Pessoa criada:", created_person)

    person_id = created_person['id']  # Obtém o ID da pessoa criada

    # Faz uma requisição PUT para editar a pessoa
    response = client.put(f'/pessoa/{person_id}', json={
        'nome': 'Thálisson Editado',
        'email': 'editado@gmail.com',
        'data': '2003-05-06'
    })
    assert response.status_code == 200  # Verifica se o status da resposta é 200 (OK)
    data = response.get_json()  # Converte a resposta para JSON
    assert data['message'] == 'Thálisson Editado editado(a) com sucesso!'  # Verifica a mensagem de sucesso

def test_edit_person_404(client):
    # Testa a edição de uma pessoa que não existe

    # Tenta editar uma pessoa com um ID que não existe
    response = client.put('/pessoa/88888', json={
        'nome': 'Thálisson Editado',
        'email': 'editado@gmail.com',
        'data': '2003-05-06'
    })
    assert response.status_code == 404  # Verifica se o status da resposta é 404 (Não Encontrado)
    data = response.get_json()  # Converte a resposta para JSON
    assert data['error'] == 'Pessoa não encontrada.'  # Verifica a mensagem de erro