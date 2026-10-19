// Comandos customizados para a API do ServeRest.
// Usados tanto nos testes de API quanto para preparar massa de dados nos testes de frontend.
// failOnStatusCode: false permite validar também respostas de erro (400, 401...).

const apiUrl = () => Cypress.expose('apiUrl')

Cypress.Commands.add('postLogin', (credenciais) => {
  return cy.request({
    method: 'POST',
    url: `${apiUrl()}/login`,
    body: credenciais,
    failOnStatusCode: false,
  })
})

Cypress.Commands.add('postUsuario', (usuario) => {
  return cy.request({
    method: 'POST',
    url: `${apiUrl()}/usuarios`,
    body: usuario,
    failOnStatusCode: false,
  })
})

Cypress.Commands.add('getUsuarios', () => {
  return cy.request({
    method: 'GET',
    url: `${apiUrl()}/usuarios`,
    failOnStatusCode: false,
  })
})

Cypress.Commands.add('getUsuario', (id) => {
  return cy.request({
    method: 'GET',
    url: `${apiUrl()}/usuarios/${id}`,
    failOnStatusCode: false,
  })
})

Cypress.Commands.add('deleteUsuario', (id) => {
  return cy.request({
    method: 'DELETE',
    url: `${apiUrl()}/usuarios/${id}`,
    failOnStatusCode: false,
  })
})

// Cria um usuário pela API, garante que deu certo e devolve o _id
Cypress.Commands.add('criarUsuarioViaApi', (usuario) => {
  return cy.postUsuario(usuario).then((response) => {
    expect(response.status, 'usuário criado para o teste').to.eq(201)
    return response.body._id
  })
})
