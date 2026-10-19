import { gerarUsuario } from '../../support/factories/usuario'
import mensagens from '../../fixtures/mensagens.json'

describe('API - Usuários (/usuarios)', () => {
  let idsCriados = []

  afterEach(() => {
    idsCriados.forEach((id) => cy.deleteUsuario(id))
    idsCriados = []
  })

  it('CT-API-05 - Deve listar os usuários cadastrados', () => {
    cy.getUsuarios().then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.quantidade).to.be.a('number')
      expect(response.body.usuarios).to.be.an('array')
      expect(response.body.usuarios).to.have.length(response.body.quantidade)
    })
  })

  it('CT-API-06 - Deve cadastrar um novo usuário', () => {
    const usuario = gerarUsuario()

    cy.postUsuario(usuario).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq(mensagens.usuarios.cadastroSucesso)
      expect(response.body._id).to.be.a('string').and.not.be.empty
      idsCriados.push(response.body._id)
    })
  })

  it('CT-API-07 - Não deve cadastrar usuário com e-mail já utilizado', () => {
    const usuario = gerarUsuario()

    cy.criarUsuarioViaApi(usuario).then((id) => idsCriados.push(id))

    cy.postUsuario(usuario).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.message).to.eq(mensagens.usuarios.emailDuplicado)
    })
  })

  it('CT-API-08 - Deve buscar um usuário pelo id', () => {
    const usuario = gerarUsuario()

    cy.criarUsuarioViaApi(usuario).then((id) => {
      idsCriados.push(id)

      cy.getUsuario(id).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body._id).to.eq(id)
        expect(response.body.nome).to.eq(usuario.nome)
        expect(response.body.email).to.eq(usuario.email)
        expect(response.body).to.have.property('administrador')
      })
    })
  })

  it('CT-API-09 - Deve retornar 400 ao buscar um id inexistente', () => {
    cy.getUsuario('idInexistente123').then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.message).to.eq(mensagens.usuarios.naoEncontrado)
    })
  })

  it('CT-API-10 - Deve excluir um usuário', () => {
    const usuario = gerarUsuario()

    cy.criarUsuarioViaApi(usuario).then((id) => {
      cy.deleteUsuario(id).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq(mensagens.usuarios.exclusaoSucesso)
      })

      // Confirma que o usuário não existe mais
      cy.getUsuario(id).its('status').should('eq', 400)
    })
  })
})
