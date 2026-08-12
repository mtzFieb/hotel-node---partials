# Hotel Node

Projeto de exemplo em Node.js + Express + EJS.

## Instalação

```bash
npm install
```

## Executar

```bash
npm start
```

Acesse `http://localhost:3000`.

## Testes

```bash
npm test
```

## Feature `feature/validacaoCadCliente`

A página `/adm/adm-cliente-novo` possui validação no servidor usando `express-validator`.

São validados nome, CEP, nome de usuário, e-mail, senha, tipo de usuário e status. Em caso de erro, o formulário retorna HTTP 422, apresenta as mensagens e preserva os campos informados, exceto a senha. Com dados válidos, o cadastro retorna HTTP 201.
