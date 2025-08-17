/*Imports*/

import { faker } from '@faker-js/faker'

export default class CRUDpositivoPage {
  els = {
    btnAdd: '#addNewRecordButton',
    submit: '#submit',
    firstName: '#firstName',
    lastName:  '#lastName',
    email:     '#userEmail',
    age:       '#age',
    salary:    '#salary',
    department:'#department',
    search:    'input[placeholder="Type to search"]',
  };

  data = null;

  visitar() { cy.visit('/'); }

  /*Criar Usuário*/

  criarUsuarioViaUI(dados = {}) {
    this.clicarAdicionar()
    this.preencherFormulario(dados)
    this.submeter()
  }

  clicarAdicionar() { cy.get(this.els.btnAdd).click(); }

/*Preencher e submeter Formulário*/

  preencherFormulario(dados = {}) {
    const defaults = {
      firstName:  faker.person.firstName(),
      lastName:   faker.person.lastName(),
      email:      faker.internet.email(),
      age:        faker.number.int({ min: 18, max: 65 }),
      salary:     faker.number.int({ min: 3000, max: 10000 }), 
      department: faker.commerce.department(),
    };
    const v = { ...defaults, ...dados }
    this.data = v;

    cy.get(this.els.firstName).clear().type(v.firstName)
    cy.get(this.els.lastName).clear().type(v.lastName)
    cy.get(this.els.email).clear().type(v.email)
    cy.get(this.els.age).clear().type(String(v.age))
    cy.get(this.els.salary).clear().type(String(v.salary))
    cy.get(this.els.department).clear().type(v.department)
  }

  submeter() {
    cy.get(this.els.submit).click()
    cy.get(this.els.submit).should('not.exist')
    cy.contains('.rt-tr-group', this.data.email, { timeout: 10000 }).should('exist')
  }

  /*Validações*/  

  validarUsuarioNaTabela() {
    const d = this.data
    expect(d).to.exist

    cy.contains('.rt-tr-group', d.email).should('exist').within(() => {
      cy.get('.rt-td').eq(0).should('contain.text', d.firstName)
      cy.get('.rt-td').eq(1).should('contain.text', d.lastName)
      cy.get('.rt-td').eq(2).should('contain.text', String(d.age))
      cy.get('.rt-td').eq(3).should('contain.text', d.email)
      cy.get('.rt-td').eq(4).should('contain.text', String(d.salary))
      cy.get('.rt-td').eq(5).should('contain.text', d.department)
    })
  }

/*Editar Usuário*/

  abrirEdicaoDoUsuarioCriado() {
    expect(this.data).to.exist

    cy.get(this.els.search).clear().type(this.data.email)
    cy.contains('.rt-tr-group', this.data.email, { timeout: 10000 })
      .should('exist')
      .scrollIntoView()
      .within(() => {
        cy.get('[title="Edit"]').click({ force: true })
      })

    cy.get(this.els.firstName, { timeout: 10000 }).should('be.visible')
  }

  editarUsuario(novos = {}) {
    const atualizado = { ...this.data, ...novos }

    if (novos.firstName)  cy.get(this.els.firstName).clear().type(atualizado.firstName)
    if (novos.lastName)   cy.get(this.els.lastName).clear().type(atualizado.lastName)
    if (novos.email)      cy.get(this.els.email).clear().type(atualizado.email)
    if (novos.age)        cy.get(this.els.age).clear().type(String(atualizado.age))
    if (novos.salary)     cy.get(this.els.salary).clear().type(String(atualizado.salary))
    if (novos.department) cy.get(this.els.department).clear().type(atualizado.department)

    cy.get(this.els.submit).click()
    cy.get(this.els.submit).should('not.exist')
    this.data = atualizado
  }

  /*Excluir Usuário*/

  removerUsuarioCriado() {
    expect(this.data).to.exist

    cy.get(this.els.search).clear().type(this.data.email)
    cy.contains('.rt-tr-group', this.data.email, { timeout: 10000 })
      .should('exist')
      .scrollIntoView()
      .within(() => {
        cy.get('[title="Delete"]').click({ force: true })
      })

    cy.get('.rt-noData', { timeout: 10000 }).should('contain.text', 'No rows found')
  }

  /*Validação de Exclusão*/
  validarUsuarioRemovido() {
    cy.get(this.els.search).clear()
    cy.get('.rt-tbody').should('not.contain.text', this.data.email)
  }
}



