# Plano de Testes — ServeRest

| Item | Descrição |
|---|---|
| **Projeto** | Automação de testes da aplicação ServeRest |
| **Responsável** | Ary |
| **Versão do documento** | 1.0 |
| **Última atualização** | Outubro/2026 |

## 1. Objetivo

Validar as principais funcionalidades da aplicação ServeRest (loja virtual de estudo), garantindo que as regras de negócio de autenticação e gestão de usuários se comportam conforme o esperado, tanto pela interface quanto pela API, e manter uma suíte de regressão automatizada executada a cada alteração do projeto.

## 2. Sobre a aplicação

O ServeRest é uma aplicação pública criada para estudo de testes. Possui um frontend (loja com área de administrador e de cliente) e uma API REST documentada.

| Camada | URL |
|---|---|
| Frontend | https://front.serverest.dev |
| API | https://serverest.dev |

## 3. Escopo

### 3.1 Dentro do escopo
| Funcionalidade | Camada | Prioridade | Status |
|---|---|---|---|
| Login | Frontend | Alta | ✅ Automatizado |
| Login (`POST /login`) | API | Alta | ✅ Automatizado |
| Usuários (`/usuarios`) | API | Alta | ✅ Automatizado |
| Cadastro de usuário | Frontend | Alta | 🔜 Planejado |
| Produtos | Frontend e API | Média | 🔜 Planejado |
| Carrinho | API | Média | 🔜 Planejado |

### 3.2 Fora do escopo
- Testes de performance, carga e segurança.
- Testes de compatibilidade em dispositivos móveis.
- Testes de acessibilidade (podem ser incluídos em uma próxima versão).

## 4. Estratégia

### 4.1 Níveis e tipos de teste
| Tipo | Como é aplicado |
|---|---|
| **Funcional (positivo e negativo)** | Validação das regras de negócio com dados válidos e inválidos |
| **API** | Status code, mensagens de retorno e dados das respostas |
| **E2E (frontend)** | Fluxos do usuário pela interface |
| **Regressão** | Suíte automatizada executada a cada push e semanalmente no GitHub Actions |
| **Exploratório** | Sessões manuais antes de automatizar cada funcionalidade, para descobrir regras e riscos |

### 4.2 Abordagem de automação
- **Pirâmide de testes:** a maior parte das validações de regra fica na API (mais rápida e estável); o frontend cobre os fluxos principais do usuário.
- **Massa de dados via API:** usuários necessários aos testes de tela são criados pela API, e não pela interface, deixando os testes independentes e mais rápidos.
- **Dados dinâmicos:** cada execução gera dados novos (Faker), evitando conflito de e-mail no ambiente compartilhado.
- **Limpeza:** os usuários criados são excluídos ao final de cada teste.
- **Page Objects:** seletores e ações de cada tela ficam centralizados em `cypress/pages`.
- **Esperas inteligentes:** uso de `cy.intercept` para aguardar as requisições, sem esperas com tempo fixo.

## 5. Ambiente e ferramentas

| Item | Detalhe |
|---|---|
| Framework | Cypress 16 |
| Linguagem | JavaScript |
| Runtime | Node.js 22+ |
| Massa de dados | @faker-js/faker |
| Navegadores | Chrome (CI) e Electron (local) |
| Integração contínua | GitHub Actions |
| Registro de bugs | GitHub Issues (template de bug no repositório) |

## 6. Critérios

**Entrada**
- Ambiente do ServeRest disponível.
- Cenários de teste escritos e revisados em `docs/cenarios`.

**Saída**
- 100% dos cenários de prioridade alta executados.
- Nenhum bug crítico ou alto em aberto sem registro.
- Pipeline do GitHub Actions executando com sucesso.

## 7. Riscos

| Risco | Impacto | Mitigação |
|---|---|---|
| Ambiente público compartilhado e instável | Falhas que não são bugs | `retries` no CI e uso de dados únicos por execução |
| Dados do ServeRest online são apagados diariamente | Testes que dependam de dados fixos quebram | Todo dado necessário é criado no próprio teste |
| Mudança de layout ou de seletores no frontend | Testes de tela quebram | Seletores `data-testid` e Page Objects centralizados |
| Mudança nas mensagens da API | Asserções falham | Mensagens centralizadas em `cypress/fixtures/mensagens.json` |

## 8. Rastreabilidade

| Cenários | Arquivo de teste |
|---|---|
| CT01 a CT07 — Login (frontend) | `cypress/e2e/frontend/login.cy.js` |
| CT-API-01 a CT-API-04 — Login (API) | `cypress/e2e/api/login.api.cy.js` |
| CT-API-05 a CT-API-10 — Usuários (API) | `cypress/e2e/api/usuarios.api.cy.js` |

Detalhamento em [`docs/cenarios`](./cenarios).

## 9. Entregáveis
- Plano de testes (este documento).
- Cenários de teste em Gherkin.
- Scripts automatizados em Cypress.
- Relatórios de execução no GitHub Actions.
- Bugs registrados no GitHub Issues.
