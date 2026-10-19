import loginPage from '../../pages/LoginPage'
import { gerarUsuario } from '../../support/factories/usuario'
import mensagens from '../../fixtures/mensagens.json'

describe('Login - Frontend', () => {
  let idsCriados = []

  // Cria o usuário pela API (mais rápido e estável que pela tela) e guarda o id para limpeza
  const criarUsuario = (administrador = 'true') => {
    const usuario = gerarUsuario({ administrador })
    return cy.criarUsuarioViaApi(usuario).then((id) => {
      idsCriados.push(id)
      return usuario
    })
  }

  beforeEach(() => {
    idsCriados = []
    // Observa a requisição de login para esperar a resposta em vez de usar cy.wait(tempo fixo)
    cy.intercept('POST', '**/login').as('requisicaoLogin')
    loginPage.visitar()
  })

  afterEach(() => {
    idsCriados.forEach((id) => cy.deleteUsuario(id))
  })

  context('Cenários positivos', () => {
    it('CT01 - Deve realizar login com sucesso com usuário administrador', () => {
      criarUsuario('true').then((usuario) => {
        loginPage.fazerLogin(usuario.email, usuario.password)
      })

      cy.wait('@requisicaoLogin').its('response.statusCode').should('eq', 200)
      cy.location('pathname').should('eq', '/admin/home')
    })

    it('CT02 - Deve realizar login com sucesso com usuário comum', () => {
      criarUsuario('false').then((usuario) => {
        loginPage.fazerLogin(usuario.email, usuario.password)
      })

      cy.wait('@requisicaoLogin').its('response.statusCode').should('eq', 200)
      cy.location('pathname').should('eq', '/home')
    })
  })

  context('Cenários negativos', () => {
    it('CT03 - Não deve realizar login com senha incorreta', () => {
      criarUsuario().then((usuario) => {
        loginPage.fazerLogin(usuario.email, 'SenhaErrada123')
      })

      cy.wait('@requisicaoLogin').its('response.statusCode').should('eq', 401)
      loginPage.validarMensagem(mensagens.login.credenciaisInvalidas)
      cy.location('pathname').should('eq', '/login')
    })

    it('CT04 - Não deve realizar login com e-mail não cadastrado', () => {
      const naoCadastrado = gerarUsuario()

      loginPage.fazerLogin(naoCadastrado.email, naoCadastrado.password)

      cy.wait('@requisicaoLogin').its('response.statusCode').should('eq', 401)
      loginPage.validarMensagem(mensagens.login.credenciaisInvalidas)
      cy.location('pathname').should('eq', '/login')
    })

    it('CT05 - Deve exibir mensagens de obrigatoriedade ao enviar os campos vazios', () => {
      loginPage.clicarEntrar()

      loginPage.validarMensagem(mensagens.login.emailObrigatorio)
      loginPage.validarMensagem(mensagens.login.senhaObrigatoria)
    })

    it('CT06 - Deve exibir obrigatoriedade apenas da senha quando só o e-mail é informado', () => {
      loginPage.preencherEmail(gerarUsuario().email)
      loginPage.clicarEntrar()

      loginPage.validarMensagem(mensagens.login.senhaObrigatoria)
      loginPage.validarMensagemAusente(mensagens.login.emailObrigatorio)
    })
  })

  context('Navegação', () => {
    it('CT07 - Deve redirecionar para a tela de cadastro ao clicar no link de cadastro', () => {
      loginPage.clicarCadastrar()

      cy.location('pathname').should('eq', '/cadastrarusuarios')
    })
  })
})
