<div align="center">

# Desafio Cypress — Academia de QE (Accenture)
## WebTables CRUD — Cypress + Cucumber + Faker

Automação E2E do **DemoQA / Web Tables** cobrindo o fluxo **CRUD positivo**:  
**criar**, **editar** e **excluir** um usuário, estruturado em **POM (Page Object Model)**.

<a><img alt="Cypress" src="https://img.shields.io/badge/tests-Cypress-14.x-brightgreen"></a>
<a><img alt="Cucumber" src="https://img.shields.io/badge/BDD-Cucumber%2FGherkin-blue"></a>
<a><img alt="Faker" src="https://img.shields.io/badge/data-Faker-9.x-orange"></a>

</div>

---

## Contexto do Desafio
Projeto desenvolvido para o **Desafio de Cypress** da **Academia de QE (Accenture)**.  
O objetivo é demonstrar boas práticas de automação E2E com **Cypress**, **Cucumber/Gherkin** e **Faker**, usando **Page Object Model** e validando o fluxo **CRUD positivo** no **DemoQA Web Tables**.

> **Escopo entregue**
> - **Create**: cria usuário com dados Faker e valida na tabela  
> - **Update**: localiza por **e-mail** (âncora única), abre modal e atualiza campos  
> - **Delete**: remove usuário e valida ausência na tabela

---

## Stack
- **Cypress** 14 (`^14.5.4`)
- **cypress-cucumber-preprocessor** 4 (`^4.3.1`)
- **@faker-js/faker** 9 (`^9.9.0`)
- **Page Object Model (POM)**

---

## Requisitos
- Node.js **16+**  
- npm **8+**

---

## Como rodar
Instalar dependências:
~~~bash
npm install
~~~

Abrir o runner (interativo):
~~~bash
npx cypress open
~~~

Headless (todos os .feature):
~~~bash
npx cypress run
~~~

Rodar apenas o CRUD positivo:
~~~bash
npx cypress run --spec "cypress/e2e/CRUDpositivo.feature"
~~~

---

## Configuração usada

**package.json (trecho relevante)**
~~~json
{
  "devDependencies": {
    "@faker-js/faker": "^9.9.0",
    "cypress": "^14.5.4",
    "cypress-cucumber-preprocessor": "^4.3.1"
  },
  "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": false,
    "stepDefinitions": "cypress/support/step-definitions/"
  }
}
~~~

**cypress.config.js**
~~~js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: { 
    video: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    watchForFileChanges: false,
    testIsolation: false, // reutiliza o mesmo usuário/estado entre cenários
    specPattern: 'cypress/e2e/**/*.feature',
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      const cucumber = require("cypress-cucumber-preprocessor").default;
      on('file:preprocessor', cucumber());
    },
  },
});
~~~

---

## Estrutura
~~~
cypress/
  e2e/
    CRUDpositivo.feature
  fixtures/
  support/
    pages/
      CRUDpositivo.js
    step-definitions/
      CRUDpositivo.cy.js
    commands.js
    e2e.js
cypress.config.js
package.json
~~~

---

## Padrão POM 
**Page**: `support/pages/CRUDpositivo.js`
- `els`: seletores (ex.: `firstName`, `email`, `search`)
- **Ações**: `visitar`, `clicarAdicionar`, `preencherFormulario`, `submeter`,  
  `abrirEdicaoDoUsuarioCriado`, `editarUsuario`, `removerUsuarioCriado`
- **Validações**: `validarUsuarioNaTabela`, `validarUsuarioRemovido`
- Guarda os dados gerados em `this.data` para asserts

**Steps**: `support/step-definitions/CRUDpositivo.cy.js`
- Mapeiam `Given/When/Then` para os métodos da Page

---

## Notas importantes
- **Salary** aceita **apenas dígitos** → gere com `faker.number.int(...)` e use `String(...)` no `.type()`.
- Após submeter, aguarde o modal fechar antes de validar:
~~~js
cy.get('#submit').click();
cy.get('#submit').should('not.exist');
~~~
- Para localizar a linha do usuário:  
  `cy.contains('.rt-tr-group', email)` + clique por `[title="Edit"]` / `[title="Delete"]`.
**Reuso entre cenários:** `testIsolation: false` permite usar o **mesmo usuário** no fluxo criar → editar → excluir.  
---

## Autor
**Matheus Goes** 

## Licença
ISC
