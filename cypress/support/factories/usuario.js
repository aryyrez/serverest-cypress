import { fakerPT_BR as faker } from '@faker-js/faker'

// Gera um usuário novo a cada chamada, evitando conflito de e-mail entre execuções.
// administrador: 'true' | 'false' (a API do ServeRest espera string)
export function gerarUsuario({ administrador = 'true' } = {}) {
  const sufixo = `${Date.now()}${faker.string.alphanumeric(4)}`.toLowerCase()

  return {
    nome: faker.person.fullName(),
    email: `qa.${sufixo}@teste.com.br`,
    password: faker.internet.password({ length: 10 }),
    administrador,
  }
}
