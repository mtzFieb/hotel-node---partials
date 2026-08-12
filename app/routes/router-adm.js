const express = require("express");
const { validationResult } = require("express-validator");
const validacaoCadCliente = require("../middlewares/validacaoCadCliente");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/index-adm");
});

router.get("/adm-cliente", (req, res) => {
    res.render("pages/adm-cliente");
});

router.get("/adm-cliente-novo", (req, res) => {
    res.render("pages/adm-cliente-novo", { errors: [], dados: {} });
});

router.post("/adm-cliente-novo", validacaoCadCliente, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render("pages/adm-cliente-novo", {
            errors: errors.array(),
            dados: req.body
        });
    }

    res.status(201).send("Cliente cadastrado com sucesso!");
});

router.get("/adm-cliente-edit", (req, res) => {
    res.render("pages/adm-cliente-edit");
});

router.get("/adm-cliente-list", (req, res) => {
    res.render("pages/adm-cliente-list");
});

router.get("/adm-cliente-del", (req, res) => {
    res.render("pages/adm-cliente-del");
});

module.exports = router;
