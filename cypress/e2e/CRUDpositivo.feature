#UTF-8
# language: pt

Funcionalidade: CRUDpositivo

Cenário: Criar um novo usuário
  Dado que estou na página inicial
  Quando clico no botão para adicionar um novo usuário
  E preencho o formulário de criação de conta corretamente
  E envio o formulário
  Então devo ver o novo usuário na lista de usuários

Cenário: Editar o usuário recém-criado
  Quando abro a edição do usuário recém-criado
  E atualizo o departamento para "QA"
  Então devo ver o usuário atualizado na lista

Cenário: Excluir o usuário recém-criado
  Quando removo o usuário recém-criado
  Então o usuário não deve aparecer na lista
