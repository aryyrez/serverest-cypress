import { gerarUsuario } from '../../support/factories/usuario'
import mensagens from '../../fixtures/mensagens.json'

describe('API - Login (POST /login)', () => {
  let usuario
  let idUsuario

  before(() => {
    usuario = gerarUsuario()
    cy.criarUsuarioViaApi(usuario).then((id) => {
      idUsuario = id
    })
  })

  after(() => {
    cy.deleteUsuario(idUsuario)
  })

  it('CT-API-01 - Deve autenticar com credenciais válidas e retornar o token', () => {
    cy.postLogin({ email: usuario.email, password: usuario.password }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq(mensagens.login.sucesso)
      expect(response.body.authorization).to.match(/^Bearer /)
    })
  })

  it('CT-API-02 - Não deve autenticar com senha incorreta', () => {
    cy.postLogin({ email: usuario.email, password: 'SenhaErrada123' }).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body.message).to.eq(mensagens.login.credenciaisInvalidas)
      expect(response.body).to.not.have.property('authorization')
    })
  })

  it('CT-API-03 - Não deve autenticar com e-mail não cadastrado', () => {
    const naoCadastrado = gerarUsuario()

    cy.postLogin({ email: naoCadastrado.email, password: naoCadastrado.password }).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body.message).to.eq(mensagens.login.credenciaisInvalidas)
    })
  })

  it('CT-API-04 - Deve retornar 400 quando e-mail e senha não são enviados', () => {
    cy.postLogin({}).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('email')
      expect(response.body).to.have.property('password')
    })
  })
})
