const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // Valores públicos lidos nos testes com Cypress.expose('nome')
  expose: {
    apiUrl: 'https://serverest.dev',
  },

  e2e: {
    baseUrl: 'https://front.serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.js',
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 8000,
    video: false,
    screenshotOnRunFailure: true,
    // Repete 1 vez no modo headless (CI) para reduzir falhas por instabilidade do ambiente público
    retries: {
      runMode: 1,
      openMode: 0,
    },
  },
})
