/// <reference types="cypress" />


describe('Cadastro', () => {
  let email;
  beforeEach(() => {
    cy.visit('/cadastrarusuarios');
    email = `testqa${Date.now()}@tests.com`;
  });

  it('Pagina carregando corretamente', () => {
    cy.url().should('include', '/cadastrarusuarios');
    cy.get('[data-testid="cadastrar"]').should('be.visible');
  });

  it('Cadastro comum com sucesso', () => {

    cy.cadastroUsuario({
      nome: 'MatheusAUT',
      email: email,
      senha: 'TestAUT2026'
    });
    cy.contains('.alert', 'Cadastro realizado com sucesso').should('be.visible');
    cy.location('pathname', { timeout: 5000 }).should('eq', '/home');
  });

  it('Cadastro como adm', () => {
    cy.cadastroUsuario({
      nome: 'MatheusAUT',
      email: email,
      senha: 'TestAUT2026',
      administrador: true
    });
    cy.contains('.alert', 'Cadastro realizado com sucesso').should('be.visible');
    cy.location('pathname', { timeout: 5000 }).should('eq', '/admin/home');
  });

  it('Cadastro com email ja usado', () => {
    cy.cadastroUsuario({
      nome: 'MatheusAUT',
      email: email,
      senha: 'TestAUT2026'
    })
    cy.location('pathname').should('eq', '/home');
    cy.visit('/cadastrarusuarios');

    cy.cadastroUsuario({
      nome: 'MatheusAUT',
      email: email,
      senha: 'TesteAUT2026'
    })
    cy.contains('Este email já está sendo usado').should('be.visible');
  })

  it('Cadastro com campos vazios', () => {
    cy.cadastroUsuario({})
    cy.contains('.alert', 'Nome é obrigatório').should('be.visible');
    cy.contains('.alert', 'Email é obrigatório').should('be.visible')
    cy.contains('.alert', 'Password é obrigatório').should('be.visible')
  })

})