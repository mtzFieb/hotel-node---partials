const express = require("express");
const router = express.Router();
const { body, validationResult }  = require("express-validator");



router.get("/", (req, res)=>{
    res.render("pages/index", {perfil:null});
})

router.get("/login", (req, res)=>{
    res.render("pages/login", {perfil:null});
})

router.post("/login", (req, res)=>{
    if(nomeUser == "joca" && senhaUser == "1234"){
        res.render("pages/perfil", {
            perfil: true,
            erros: [],
            dados: {}
        });
    }else{
        res.send("Nome de usuário e/ou senha inválidos!");
    }


})


// rota post /cadastro -> exibir os dados enviados em uma página




router.get("/cadastro", (req, res)=>{
    res.render("pages/cadastro", {perfil:null});
})

router.post('/cadastro', (req, res) => {
    const { nome, email, cpf, telefone, senha, confirmarSenha } = req.body;

    const erros = [];

    if (!nome || nome.trim().length < 3) {
        erros.push('O nome deve ter pelo menos 3 caracteres.');
    }

    if (!email || !email.includes('@')) {
        erros.push('Digite um e-mail válido.');
    }

    if (!cpf || cpf.length < 11) {
        erros.push('Digite um CPF válido.');
    }

    if (!telefone || telefone.length < 10) {
        erros.push('Digite um telefone válido.');
    }

    if (!senha || senha.length < 6) {
        erros.push('A senha deve ter pelo menos 6 caracteres.');
    }

    if (senha !== confirmarSenha) {
        erros.push('As senhas não coincidem.');
    }

    if (erros.length > 0) {
        return res.render('perfil', {
            erros,
            dados: req.body
        });
    }

    // Se chegou aqui, passou pelas validações
    // código para cadastrar o usuário...
});

router.get("/perfil", (req, res) => {
    res.render("pages/perfil", {
        perfil: true,
        erros: [],
        dados: {}
    });
});

router.post("/perfil", [
    body("nome")
        .trim()
        .notEmpty()
        .withMessage("O nome é obrigatório.")
        .isLength({ min: 3 })
        .withMessage("O nome deve ter pelo menos 3 caracteres."),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("O e-mail é obrigatório.")
        .isEmail()
        .withMessage("Digite um e-mail válido."),

    body("nome-usuario")
        .trim()
        .notEmpty()
        .withMessage("O nome de usuário é obrigatório.")
        .isLength({ min: 3 })
        .withMessage("O nome de usuário deve ter pelo menos 3 caracteres."),

    body("cpf")
        .trim()
        .notEmpty()
        .withMessage("O CPF é obrigatório.")
        .isLength({ min: 11, max: 14 })
        .withMessage("Digite um CPF válido."),

    body("senha")
        .optional({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage("A senha deve ter pelo menos 6 caracteres.")

], (req, res) => {

    const erros = validationResult(req);

    if (!erros.isEmpty()) {
        return res.render("pages/perfil", {
            perfil: true,
            erros: erros.array(),
            dados: req.body
        });
    }

    return res.render("pages/perfil", {
        perfil: true,
        erros: [],
        dados: req.body,
        sucesso: "Dados alterados com sucesso!"
    });
});






module.exports = router;