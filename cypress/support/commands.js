// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/** 
@param {Object} dados
@param {string} [dados.nome]
@param {string} [dados.email]
@param {string} [dados.senha]
@param {boolean} [dados.administrador=false] Marca o checkbox de administrador quando true
*/

Cypress.Commands.add('cadastroUsuario', ({ nome, email, senha, administrador = false } = {}) => {
    const preencherCampo = (seletor, valor) => {
        if (valor !== undefined) {
            cy.get(seletor).type(valor)
        }
    }
    preencherCampo('[data-testid="nome"]', nome);
    preencherCampo('[data-testid="email"]', email);
    preencherCampo('[data-testid="password"]', senha);
    if (administrador) {
        cy.get('[data-testid="checkbox"]').check()
    }
    cy.get('[data-testid="cadastrar"]').click();
})