const BASE_URL = 'http://localhost:3000';

describe('Página de Início e Menú de Navegação', () => {
  beforeEach(() => {
    // Navega até a página inicial antes de cada teste
    cy.visit(`${BASE_URL}`);
  });

  it('Deve renderizar o cabeçalho', () => {
    // Verifica se os links do cabeçalho estão visíveis
    cy.get('a').contains('Personify').should('be.visible');
    cy.screenshot('personify');
    cy.get('a').contains('Início').should('be.visible');
    cy.get('a').contains('Pessoas').should('be.visible');
    cy.get('a').contains('Adicionar Pessoa').should('be.visible');
  });

  // Verifica se o título e o parágrafo de introdução estão presentes
  it('Deve renderizar o título e parágrafo da página', () => {
    cy.get('h1').contains('Bem-vindo ao Personify').should('be.visible');
    cy.get('p').contains('Gerencie seus dados de usuários e pessoas com facilidade.').should('be.visible');
  });

  // Verifica se o link "Visualizar Dados" está visível
  it('Deve renderizar o link de visualizar dados', () => {
    cy.get('a').contains('Visualizar Dados').should('be.visible');
  });

  // Testa a navegação para a página de listagem de pessoas
  it('Deve navegar para a página de listagem de pessoas ao clicar no link "Pessoas"', () => {
    cy.get('a').contains('Pessoas').click();
    cy.url().should('include', '/pessoas');
  });

  // Testa a navegação para a página de adicionar pessoa
  it('Deve navegar para a página de adicionar pessoa ao clicar no link "Adicionar Pessoa"', () => {
    cy.get('a').contains('Adicionar Pessoa').click();
    cy.url().should('include', '/pessoa');
  });

  // Testa a navegação para a página de listagem de dados
  it('Deve navegar para a página de listagem de dados ao clicar no link "Visualizar Dados"', () => {
    cy.get('a').contains('Visualizar Dados').click();
    cy.url().should('include', '/pessoas');
  });
});

describe('Página de Listagem, Cadastro de Pessoas, Informações sobre Pessoa e Edição de Pessoas', () => {
  beforeEach(() => {
    // Intercepta as requisições de API antes de cada teste
    cy.intercept('GET', '/api/pessoas', {
      statusCode: 200,
      body: [
        {
          id: 1,
          nome: 'Thalisson',
          email: 'thalissongsilva70@gmail.com',
          data: '05/04/2002',
        },
      ],
    }).as('getPessoas');

    cy.intercept('DELETE', '/api/pessoas/*', {
      statusCode: 200,
      body: { message: 'Pessoa deletada com sucesso!' },
    }).as('deletePessoa');
  });

  it('Deve gerenciar a lista de pessoas, incluindo edição e deleção', () => {
    // Navega até a página de listagem de pessoas
    cy.visit(`${BASE_URL}/pessoas`);
    cy.wait(1000); // Aguarda a tabela carregar

    // Função recursiva para deletar todas as pessoas visíveis
    function deleteAllVisible() {
      cy.get('table tbody').then(($tbody) => {
        if ($tbody.children('tr').length > 0) {
          cy.get('button').contains('Deletar').first().click();
          cy.wait(500); // Aguarda a atualização da tabela
          deleteAllVisible(); // Chama a função novamente
        } else {
          cy.visit(`${BASE_URL}/pessoa`); // Vai para a página de cadastro se não houver mais pessoas
        }
      });
    }

    // Executa a função de deletar todas as pessoas
    deleteAllVisible();

    // Preenche o formulário de cadastro de pessoa
    cy.get('h1').contains('Cadastrar nova pessoa').should('be.visible');
    cy.get('input[placeholder="Nome"]').type('Thalisson');
    cy.get('input[placeholder="name@example.com"]').type('thalissongsilva70@gmail.com');
    cy.get('input[placeholder="01/01/2000"]').type('2002-04-05');
    cy.get('button').contains('Salvar').should('be.visible');
    cy.get('a').contains('Voltar').should('be.visible');
    cy.get('button').contains('Salvar').click();

    // Verifica se a mensagem de sucesso ou erro aparece corretamente
    cy.get('div').then(($div) => {
      if ($div.text().includes('Pessoa cadastrada com sucesso!')) {
        cy.get($div).contains('Pessoa cadastrada com sucesso!').should('be.visible');
      } else if ($div.text().includes('Essa pessoa já está cadastrada')) {
        cy.get($div).contains('Essa pessoa já está cadastrada').should('be.visible');
      }
    });

    // Retorna para a listagem e verifica a presença dos dados cadastrados
    cy.get('a').contains('Voltar').click();
    cy.get('td').contains('Thalisson').should('be.visible');
    cy.get('td').contains('thalissongsilva70@gmail.com').should('be.visible');
    cy.get('td').contains('05/04/2002').should('be.visible');
    cy.get('button').contains('Editar').should('be.visible');
    cy.get('button').contains('Deletar').should('be.visible');

    // Testa a funcionalidade de edição
    cy.get('button').contains('Editar').click();
    cy.url().should('include', '/pessoa/');
    cy.get('h1').contains('Editar informação').should('be.visible');
    cy.get('input[name="nome"]').should('have.value', 'Thalisson');
    cy.get('input[name="email"]').should('have.value', 'thalissongsilva70@gmail.com');
    cy.get('input[name="data"]').should('have.value', '2002-04-05');
    cy.get('button').contains('Salvar').should('be.visible');
    cy.get('button').contains('Cancelar').should('be.visible');

    // Salva as alterações e verifica a mensagem de sucesso
    cy.get('button').contains('Salvar').click();
    cy.get('div').contains('Pessoa editada com sucesso!').should('be.visible');

    // Cancela a edição e retorna à listagem
    cy.get('button').contains('Cancelar').click();
    cy.url().should('include', '/pessoa/');
    cy.visit(`${BASE_URL}/pessoas`);

    // Testa a funcionalidade de ver mais informações sobre a pessoa
    cy.get('button').contains('Thalisson').click();
    cy.get('h1').contains('Pessoa encontrada:').should('be.visible');
    cy.get('li').contains('ID: ').should('be.visible');
    cy.get('li').contains('Nome: Thalisson').should('be.visible');
    cy.get('li').contains('Email: thalissongsilva70@gmail.com').should('be.visible');
    cy.get('li').contains('Data de Nascimento: 05/04/2002').should('be.visible');
    cy.get('button').contains('Editar').should('be.visible');
    cy.get('button').contains('Voltar').should('be.visible');
    cy.get('button').contains('Editar').click();
    cy.get('h1').contains('Editar informação').should('be.visible');
    cy.get('button').contains('Cancelar').should('be.visible');
    cy.get('button').contains('Cancelar').click();
    cy.get('button').contains('Voltar').click();
  });
});