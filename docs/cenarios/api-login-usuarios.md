# Cenários de Teste — API (Login e Usuários)

**Documentação da API:** https://serverest.dev
**Arquivos automatizados:**
- [`cypress/e2e/api/login.api.cy.js`](../../cypress/e2e/api/login.api.cy.js)
- [`cypress/e2e/api/usuarios.api.cy.js`](../../cypress/e2e/api/usuarios.api.cy.js)

## Login — `POST /login`

| ID | Cenário | Entrada | Resultado esperado | Status |
|---|---|---|---|---|
| CT-API-01 | Credenciais válidas | e-mail e senha cadastrados | `200` · "Login realizado com sucesso" · token `Bearer` | ✅ |
| CT-API-02 | Senha incorreta | e-mail cadastrado + senha errada | `401` · "Email e/ou senha inválidos" · sem token | ✅ |
| CT-API-03 | E-mail não cadastrado | e-mail inexistente | `401` · "Email e/ou senha inválidos" | ✅ |
| CT-API-04 | Corpo vazio | `{}` | `400` · erro nos campos `email` e `password` | ✅ |

## Usuários — `/usuarios`

| ID | Método | Cenário | Resultado esperado | Status |
|---|---|---|---|---|
| CT-API-05 | `GET /usuarios` | Listar usuários | `200` · `quantidade` igual ao tamanho da lista `usuarios` | ✅ |
| CT-API-06 | `POST /usuarios` | Cadastrar usuário | `201` · "Cadastro realizado com sucesso" · `_id` gerado | ✅ |
| CT-API-07 | `POST /usuarios` | E-mail já cadastrado | `400` · "Este email já está sendo usado" | ✅ |
| CT-API-08 | `GET /usuarios/{_id}` | Buscar por id | `200` · dados iguais aos cadastrados | ✅ |
| CT-API-09 | `GET /usuarios/{_id}` | Id inexistente | `400` · "Usuário não encontrado" | ✅ |
| CT-API-10 | `DELETE /usuarios/{_id}` | Excluir usuário | `200` · "Registro excluído com sucesso" · busca posterior retorna `400` | ✅ |

## Próximos cenários
- `PUT /usuarios/{_id}`: editar usuário e editar com e-mail de outro usuário.
- `POST /usuarios`: campos obrigatórios, e-mail inválido, `administrador` com valor diferente de `true`/`false`.
- Validação de contrato (schema) das respostas.
- Rotas de produtos com token de administrador e de usuário comum (`403`).
