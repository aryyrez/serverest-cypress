# Cenários de Teste — Login (Frontend)

**Tela:** https://front.serverest.dev/login
**Arquivo automatizado:** [`cypress/e2e/frontend/login.cy.js`](../../cypress/e2e/frontend/login.cy.js)

## Resumo

| ID | Cenário | Tipo | Prioridade | Status |
|---|---|---|---|---|
| CT01 | Login com usuário administrador | Positivo | Alta | ✅ Automatizado |
| CT02 | Login com usuário comum | Positivo | Alta | ✅ Automatizado |
| CT03 | Login com senha incorreta | Negativo | Alta | ✅ Automatizado |
| CT04 | Login com e-mail não cadastrado | Negativo | Alta | ✅ Automatizado |
| CT05 | Envio com campos vazios | Negativo | Média | ✅ Automatizado |
| CT06 | Envio somente com e-mail | Negativo | Média | ✅ Automatizado |
| CT07 | Link para a tela de cadastro | Navegação | Baixa | ✅ Automatizado |

## Regras de negócio
- **RN01:** E-mail e senha são obrigatórios.
- **RN02:** Usuário administrador é direcionado para a área administrativa (`/admin/home`).
- **RN03:** Usuário comum é direcionado para a loja (`/home`).
- **RN04:** Por segurança, credenciais inválidas exibem uma mensagem genérica, sem indicar se o erro está no e-mail ou na senha.

## Cenários (Gherkin)

```gherkin
Funcionalidade: Login
  Como usuário do ServeRest
  Quero acessar o sistema com meu e-mail e senha
  Para utilizar as funcionalidades de acordo com meu perfil

  Contexto:
    Dado que estou na tela de login

  @CT01 @positivo
  Cenário: Login com usuário administrador
    Dado que possuo um usuário administrador cadastrado
    Quando informo e-mail e senha válidos
    E clico em "Entrar"
    Então devo ser direcionado para a página inicial do administrador

  @CT02 @positivo
  Cenário: Login com usuário comum
    Dado que possuo um usuário comum cadastrado
    Quando informo e-mail e senha válidos
    E clico em "Entrar"
    Então devo ser direcionado para a página inicial da loja

  @CT03 @negativo
  Cenário: Login com senha incorreta
    Dado que possuo um usuário cadastrado
    Quando informo o e-mail correto e uma senha incorreta
    E clico em "Entrar"
    Então devo ver a mensagem "Email e/ou senha inválidos"
    E devo permanecer na tela de login

  @CT04 @negativo
  Cenário: Login com e-mail não cadastrado
    Quando informo um e-mail que não está cadastrado e uma senha qualquer
    E clico em "Entrar"
    Então devo ver a mensagem "Email e/ou senha inválidos"
    E devo permanecer na tela de login

  @CT05 @negativo
  Cenário: Envio com campos vazios
    Quando clico em "Entrar" sem preencher os campos
    Então devo ver a mensagem "Email é obrigatório"
    E devo ver a mensagem "Password é obrigatório"

  @CT06 @negativo
  Cenário: Envio somente com e-mail
    Quando preencho apenas o e-mail
    E clico em "Entrar"
    Então devo ver a mensagem "Password é obrigatório"
    E não devo ver a mensagem "Email é obrigatório"

  @CT07 @navegacao
  Cenário: Acesso à tela de cadastro
    Quando clico no link de cadastro
    Então devo ser direcionado para a tela de cadastro de usuários
```

## Ideias para próximos testes (exploratório)
- E-mail em formato inválido (ex.: `teste@`, `teste.com`).
- Espaços antes/depois do e-mail.
- E-mail com letras maiúsculas.
- Senha visível/oculta e comportamento ao pressionar Enter.
- Acesso direto a `/admin/home` sem estar logado.
- Logout e tentativa de voltar pelo botão do navegador.
