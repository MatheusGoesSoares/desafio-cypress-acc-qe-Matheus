import { Given, When, Then /* não precisa importar And */ } from 'cypress-cucumber-preprocessor/steps'
import CRUDpositivoPage from '../pages/CRUDpositivo';

const page = new CRUDpositivoPage()

/* Criação do usuário*/

Given('que estou na página inicial', () => { page.visitar(); })

When('clico no botão para adicionar um novo usuário', () => { page.clicarAdicionar(); })

When('preencho o formulário de criação de conta corretamente', () => { page.preencherFormulario(); })

When('envio o formulário', () => { page.submeter(); })

Then('devo ver o novo usuário na lista de usuários', () => { page.validarUsuarioNaTabela(); })

Given('que existe um usuário cadastrado', () => {
  page.visitar()     
  page.criarUsuarioViaUI()
  page.validarUsuarioNaTabela()
});

/* Editar Usuário */

When('abro a edição do usuário recém-criado', () => { page.abrirEdicaoDoUsuarioCriado(); })

When('atualizo o departamento para {string}', (novoDept) => {
  page.editarUsuario({ department: novoDept })
});

Then('devo ver o usuário atualizado na lista', () => { page.validarUsuarioNaTabela(); })

/* Excluir Usuário*/

When('removo o usuário recém-criado', () => { page.removerUsuarioCriado(); })

Then('o usuário não deve aparecer na lista', () => { page.validarUsuarioRemovido(); })


