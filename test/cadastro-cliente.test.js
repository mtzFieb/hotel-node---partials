const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../app");

test("GET /adm/adm-cliente-novo deve abrir o cadastro", async () => {
    const response = await request(app).get("/adm/adm-cliente-novo");
    assert.equal(response.status, 200);
    assert.match(response.text, /Novo cliente/);
});

test("POST /adm/adm-cliente-novo deve rejeitar cadastro inválido", async () => {
    const response = await request(app)
        .post("/adm/adm-cliente-novo")
        .type("form")
        .send({
            nome: "",
            cep: "123",
            nomeUsuario: "x",
            email: "email-invalido",
            senha: "123",
            tipo: "99",
            status: "9"
        });

    assert.equal(response.status, 422);
    assert.match(response.text, /O nome é obrigatório/);
    assert.match(response.text, /Informe um CEP válido/);
    assert.match(response.text, /Informe um e-mail válido/);
});

test("POST /adm/adm-cliente-novo deve aceitar cadastro válido", async () => {
    const response = await request(app)
        .post("/adm/adm-cliente-novo")
        .type("form")
        .send({
            nome: "João da Silva",
            cep: "06000-000",
            nomeUsuario: "joao.silva",
            email: "joao@example.com",
            senha: "123456",
            tipo: "1",
            status: "1"
        });

    assert.equal(response.status, 201);
    assert.match(response.text, /Cliente cadastrado com sucesso/);
});
