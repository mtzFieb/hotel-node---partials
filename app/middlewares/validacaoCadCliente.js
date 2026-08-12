const { body } = require("express-validator");

const validacaoCadCliente = [
    body("nome")
        .trim()
        .notEmpty().withMessage("O nome é obrigatório.")
        .isLength({ min: 3, max: 100 }).withMessage("O nome deve ter entre 3 e 100 caracteres."),
    body("cep")
        .trim()
        .notEmpty().withMessage("O CEP é obrigatório.")
        .matches(/^\d{5}-?\d{3}$/).withMessage("Informe um CEP válido no formato 00000-000."),
    body("nomeUsuario")
        .trim()
        .notEmpty().withMessage("O nome de usuário é obrigatório.")
        .matches(/^[A-Za-z0-9._-]+$/).withMessage("O nome de usuário pode conter apenas letras, números, ponto, hífen e sublinhado.")
        .isLength({ min: 3, max: 30 }).withMessage("O nome de usuário deve ter entre 3 e 30 caracteres."),
    body("email")
        .trim()
        .notEmpty().withMessage("O e-mail é obrigatório.")
        .isEmail().withMessage("Informe um e-mail válido.")
        .normalizeEmail(),
    body("senha")
        .notEmpty().withMessage("A senha é obrigatória.")
        .isLength({ min: 6, max: 50 }).withMessage("A senha deve ter entre 6 e 50 caracteres."),
    body("tipo")
        .notEmpty().withMessage("O tipo de usuário é obrigatório.")
        .isIn(["1", "2"]).withMessage("O tipo de usuário informado é inválido."),
    body("status")
        .notEmpty().withMessage("O status é obrigatório.")
        .isIn(["0", "1"]).withMessage("O status informado é inválido.")
];

module.exports = validacaoCadCliente;
