# Cenários de Teste — Cadastro de Usuário (Frontend)

**Tela:** https://front.serverest.dev/cadastrarusuarios
**Status:** 🔜 Planejado (próxima automação)

> Antes de automatizar, faça uma sessão de teste exploratório na tela e confirme as mensagens exibidas, os seletores e para onde o usuário é direcionado após o cadastro. Atualize os resultados esperados abaixo com o que for observado.

| ID | Cenário | Tipo | Prioridade | Status |
|---|---|---|---|---|
| CT08 | Cadastro de usuário administrador | Positivo | Alta | 🔜 |
| CT09 | Cadastro de usuário comum | Positivo | Alta | 🔜 |
| CT10 | Cadastro com e-mail já utilizado | Negativo | Alta | 🔜 |
| CT11 | Envio com campos vazios | Negativo | Média | 🔜 |
| CT12 | E-mail em formato inválido | Negativo | Média | 🔜 |

```gherkin
Funcionalidade: Cadastro de usuário
  Como visitante do ServeRest
  Quero criar minha conta
  Para acessar a loja

  Contexto:
    Dado que estou na tela de cadastro de usuários

  @CT08
  Cenário: Cadastro de usuário administrador
    Quando preencho nome, e-mail e senha válidos
    E marco a opção de administrador
    E clico em "Cadastrar"
    Então meu cadastro deve ser realizado
    E devo ser direcionado para a área do administrador

  @CT09
  Cenário: Cadastro de usuário comum
    Quando preencho nome, e-mail e senha válidos
    E clico em "Cadastrar"
    Então meu cadastro deve ser realizado
    E devo ser direcionado para a loja

  @CT10
  Cenário: Cadastro com e-mail já utilizado
    Dado que já existe um usuário cadastrado com o e-mail informado
    Quando preencho os dados com esse e-mail
    E clico em "Cadastrar"
    Então devo ver a mensagem "Este email já está sendo usado"

  @CT11
  Cenário: Envio com campos vazios
    Quando clico em "Cadastrar" sem preencher os campos
    Então devo ver as mensagens de obrigatoriedade de nome, e-mail e senha

  @CT12
  Cenário: E-mail em formato inválido
    Quando preencho o e-mail com "usuario@"
    E clico em "Cadastrar"
    Então o cadastro não deve ser realizado
```
