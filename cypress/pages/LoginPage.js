// Page Object da tela de login: concentra seletores e ações.
// Se a tela mudar, só este arquivo precisa ser ajustado.

const elementos = {
  campoEmail: '[data-testid="email"]',
  campoSenha: '[data-testid="senha"]',
  botaoEntrar: '[data-testid="entrar"]',
  linkCadastrar: '[data-testid="cadastrar"]',
}

class LoginPage {
  visitar() {
    cy.visit('/login')
  }

  preencherEmail(email) {
    cy.get(elementos.campoEmail).clear().type(email)
  }

  preencherSenha(senha) {
    // log: false evita expor a senha no log do Cypress
    cy.get(elementos.campoSenha).clear().type(senha, { log: false })
  }

  clicarEntrar() {
    cy.get(elementos.botaoEntrar).click()
  }

  clicarCadastrar() {
    cy.get(elementos.linkCadastrar).click()
  }

  fazerLogin(email, senha) {
    this.preencherEmail(email)
    this.preencherSenha(senha)
    this.clicarEntrar()
  }

  validarMensagem(texto) {
    cy.contains(texto).should('be.visible')
  }

  validarMensagemAusente(texto) {
    cy.contains(texto).should('not.exist')
  }
}

export default new LoginPage()
