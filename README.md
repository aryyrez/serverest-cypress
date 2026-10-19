# 🧪 Automação de Testes — ServeRest com Cypress

[![Testes Cypress](https://github.com/aryyrez/serverest-cypress/actions/workflows/cypress.yml/badge.svg)](https://github.com/aryyrez/serverest-cypress/actions/workflows/cypress.yml)
[![Badge ServeRest](https://img.shields.io/badge/API-ServeRest-green)](https://github.com/ServeRest/ServeRest/)
![Cypress](https://img.shields.io/badge/Cypress-16-17202C?logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

Projeto de automação de testes **E2E (frontend)** e de **API** da aplicação [ServeRest](https://front.serverest.dev).

O objetivo é mostrar o processo completo de QA: **entendimento das regras de negócio → planejamento → escrita dos cenários → automação → execução contínua no CI → registro de bugs**.

<!-- Depois de rodar os testes, grave um GIF da execução e salve em docs/evidencias/execucao.gif -->
<!-- ![Execução dos testes](docs/evidencias/execucao.gif) -->

---

## 📋 Sumário
- [Escopo](#-escopo)
- [Tecnologias](#️-tecnologias)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Como executar](#️-como-executar)
- [Cenários automatizados](#-cenários-automatizados)
- [Boas práticas aplicadas](#-boas-práticas-aplicadas)
- [Documentação de QA](#-documentação-de-qa)
- [Próximos passos](#-próximos-passos)
- [Autora](#-autora)

---

## 🎯 Escopo

| Funcionalidade | Camada | Status |
|---|---|---|
| Login | Frontend | ✅ Automatizado |
| Login (`POST /login`) | API | ✅ Automatizado |
| Usuários (`/usuarios`) | API | ✅ Automatizado |
| Cadastro de usuário | Frontend | 🔜 Planejado |
| Produtos e carrinho | Frontend e API | 🔜 Planejado |

## 🛠️ Tecnologias

- [Cypress](https://www.cypress.io/) — framework de testes E2E e de API
- JavaScript (Node.js 22+)
- [Faker](https://fakerjs.dev/) — geração de massa de dados
- GitHub Actions — integração contínua
- GitHub Issues — registro de bugs

## 📁 Estrutura do projeto

```
serverest-cypress/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── bug-report.md          # Template para registrar bugs
│   └── workflows/
│       └── cypress.yml            # Pipeline do GitHub Actions
├── cypress/
│   ├── e2e/
│   │   ├── api/                   # Testes de API
│   │   │   ├── login.api.cy.js
│   │   │   └── usuarios.api.cy.js
│   │   └── frontend/              # Testes E2E da interface
│   │       └── login.cy.js
│   ├── fixtures/
│   │   └── mensagens.json         # Mensagens esperadas do sistema
│   ├── pages/
│   │   └── LoginPage.js           # Page Object da tela de login
│   └── support/
│       ├── commands.js            # Comandos customizados (requisições da API)
│       ├── e2e.js                 # Configuração carregada antes dos testes
│       └── factories/
│           └── usuario.js         # Gerador de usuários com dados dinâmicos
├── docs/
│   ├── cenarios/                  # Cenários de teste (Gherkin e tabelas)
│   ├── evidencias/                # Prints e GIFs da execução
│   └── plano-de-testes.md
├── cypress.config.js
├── package.json
└── README.md
```

## ▶️ Como executar

**Pré-requisitos:** [Node.js 22+](https://nodejs.org/) e [Git](https://git-scm.com/).

```bash
# 1. Clonar o repositório
git clone https://github.com/aryyrez/serverest-cypress.git
cd serverest-cypress

# 2. Instalar as dependências
npm install

# 3. Abrir o Cypress no modo interativo
npm run cy:open

# 4. Ou executar em modo headless
npm test             # todos os testes
npm run test:front   # apenas frontend
npm run test:api     # apenas API
```

## ✅ Cenários automatizados

**Frontend — Login** ([detalhes](docs/cenarios/login-frontend.md))

| ID | Cenário |
|---|---|
| CT01 | Login com sucesso com usuário administrador |
| CT02 | Login com sucesso com usuário comum |
| CT03 | Login com senha incorreta |
| CT04 | Login com e-mail não cadastrado |
| CT05 | Mensagens de obrigatoriedade com campos vazios |
| CT06 | Obrigatoriedade apenas da senha quando só o e-mail é informado |
| CT07 | Redirecionamento para a tela de cadastro |

**API — Login e Usuários** ([detalhes](docs/cenarios/api-login-usuarios.md))

| ID | Cenário |
|---|---|
| CT-API-01 a 04 | `POST /login`: sucesso, senha incorreta, e-mail inexistente e corpo vazio |
| CT-API-05 a 10 | `/usuarios`: listar, cadastrar, e-mail duplicado, buscar por id, id inexistente e excluir |

## 💡 Boas práticas aplicadas

- **Page Objects** — seletores e ações de cada tela centralizados em `cypress/pages`.
- **Massa de dados via API** — os usuários dos testes de tela são criados pela API, deixando os testes mais rápidos e independentes da interface.
- **Dados dinâmicos** — cada execução gera usuários novos, evitando conflitos no ambiente público.
- **Limpeza dos dados** — tudo que o teste cria é excluído ao final.
- **Seletores estáveis** — uso de atributos `data-testid`.
- **Sem esperas fixas** — `cy.intercept` aguarda a resposta real da requisição em vez de `cy.wait(5000)`.
- **Mensagens centralizadas** — textos esperados em `fixtures/mensagens.json`, fáceis de manter.
- **Integração contínua** — testes executados a cada push, pull request e semanalmente.

## 📄 Documentação de QA

- [Plano de testes](docs/plano-de-testes.md)
- [Cenários — Login (frontend)](docs/cenarios/login-frontend.md)
- [Cenários — API](docs/cenarios/api-login-usuarios.md)
- [Cenários — Cadastro de usuário (planejado)](docs/cenarios/cadastro-usuario-frontend.md)
- Bugs encontrados: aba [Issues](../../issues) do repositório

## 🚀 Próximos passos

- [ ] Automatizar o cadastro de usuário pelo frontend
- [ ] Testes de produtos (admin) e carrinho
- [ ] Validação de contrato (schema) das respostas da API
- [ ] Relatório HTML de execução publicado no GitHub Pages
- [ ] Versão do projeto em Playwright para comparação

## 👩‍💻 Autora

**Ary** — QA | Engenharia de Software 

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aryyrez)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/aryyrez)

---

Aplicação testada: [ServeRest](https://github.com/ServeRest/ServeRest), projeto open source de [Paulo Gonçalves](https://github.com/PauloGoncalvesBH) para estudo de testes.
