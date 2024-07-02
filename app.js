var express = require("express");
var app = express();
var path = require('path');
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "ProjetoBD"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Conectado!");
});

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res){
    var nome = "Loja de Cartas Pokémon TCG";

    var selectCartas = "SELECT * FROM Cartas";
    var selectClientes = "SELECT * FROM Clientes";
    var selectVendas = "SELECT * FROM Vendas";
    var selectCompras = "SELECT * FROM Compras";
    var selectTrocas = "SELECT * FROM Trocas";

    con.query(selectCartas, function (err, resultCartas) {
        if (err) throw err;
        con.query(selectClientes, function (err, resultClientes) {
            if (err) throw err;
            con.query(selectVendas, function (err, resultVendas) {
                if (err) throw err;
                con.query(selectCompras, function (err, resultCompras) {
                    if (err) throw err;
                    con.query(selectTrocas, function (err, resultTrocas) {
                        if (err) throw err;
                        res.render("index.ejs", {
                            nome: nome,
                            cartas: resultCartas,
                            clientes: resultClientes,
                            vendas: resultVendas,
                            compras: resultCompras,
                            trocas: resultTrocas
                        });
                    });
                });
            });
        });
    });
});

app.post("/cartas/add", function(req, res) {
    var nome = req.body.nome;
    var tipo = req.body.tipo;
    var raridade = req.body.raridade;
    var expansao = req.body.expansao;
    var condicao = req.body.condicao;
    var precoCompra = req.body.preco_compra;
    var precoVenda = req.body.preco_venda;
    var quantidadeEstoque = req.body.quantidade;

    var insert = `INSERT INTO Cartas (Nome, Tipo, Raridade, Expansao, Condicao, PrecoCompra, PrecoVenda, QuantidadeEstoque) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(insert, [nome, tipo, raridade, expansao, condicao, precoCompra, precoVenda, quantidadeEstoque], function (err, result) {
        if (err) throw err;
        console.log("1 carta inserida");
        res.redirect("/");
    });
});

app.post("/cartas/edit", function(req, res) {
    var id = req.body.id;
    var nome = req.body.nome;
    var tipo = req.body.tipo;
    var raridade = req.body.raridade;
    var expansao = req.body.expansao;
    var condicao = req.body.condicao;
    var precoCompra = req.body.preco_compra;
    var precoVenda = req.body.preco_venda;
    var quantidadeEstoque = req.body.quantidade;

    var update = `UPDATE Cartas SET Nome=?, Tipo=?, Raridade=?, Expansao=?, Condicao=?, PrecoCompra=?, PrecoVenda=?, QuantidadeEstoque=? WHERE ID=?`;

    con.query(update, [nome, tipo, raridade, expansao, condicao, precoCompra, precoVenda, quantidadeEstoque, id], function (err, result) {
        if (err) throw err;
        console.log("1 carta atualizada");
        res.redirect("/");
    });
});

app.post("/cartas/delete/:id", function(req, res) {
    var id = req.params.id;

    var deleteQuery = `DELETE FROM Cartas WHERE ID = ?`;

    con.query(deleteQuery, [id], function (err, result) {
        if (err) throw err;
        console.log("1 carta deletada");
        res.redirect("/");
    });
});

app.post("/clientes/add", function(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var telefone = req.body.telefone;
    var endereco = req.body.endereco;

    var insert = `INSERT INTO Clientes (Nome, Email, Telefone, Endereco) VALUES (?, ?, ?, ?)`;

    con.query(insert, [nome, email, telefone, endereco], function (err, result) {
        if (err) throw err;
        console.log("1 cliente inserido");
        res.redirect("/");
    });
});

app.post("/clientes/edit", function(req, res) {
    var id = req.body.id;
    var nome = req.body.nome;
    var email = req.body.email;
    var telefone = req.body.telefone;
    var endereco = req.body.endereco;

    var update = `UPDATE Clientes SET Nome=?, Email=?, Telefone=?, Endereco=? WHERE ID=?`;

    con.query(update, [nome, email, telefone, endereco, id], function (err, result) {
        if (err) throw err;
        console.log("1 cliente atualizado");
        res.redirect("/");
    });
});

app.post("/clientes/delete/:id", function(req, res) {
    var id = req.params.id;

    var deleteQuery = `DELETE FROM Clientes WHERE ID = ?`;

    con.query(deleteQuery, [id], function (err, result) {
        if (err) throw err;
        console.log("1 cliente deletado");
        res.redirect("/");
    });
});

app.post("/vendas/add", function(req, res) {
    var clienteId = req.body.cliente_id;
    var cartaId = req.body.carta_id;
    var quantidade = req.body.quantidade;
    var preco = req.body.preco;
    var dataVenda = req.body.data_venda;

    var insert = `INSERT INTO Vendas (ClienteID, CartaID, Quantidade, Preco, DataVenda) VALUES (?, ?, ?, ?, ?)`;

    con.query(insert, [clienteId, cartaId, quantidade, preco, dataVenda], function (err, result) {
        if (err) throw err;
        console.log("1 venda inserida");
        res.redirect("/");
    });
});

app.post("/vendas/edit", function(req, res) {
    var id = req.body.id;
    var clienteId = req.body.cliente_id;
    var cartaId = req.body.carta_id;
    var quantidade = req.body.quantidade;
    var preco = req.body.preco;
    var dataVenda = req.body.data_venda;

    var update = `UPDATE Vendas SET ClienteID=?, CartaID=?, Quantidade=?, Preco=?, DataVenda=? WHERE ID=?`;

    con.query(update, [clienteId, cartaId, quantidade, preco, dataVenda, id], function (err, result) {
        if (err) throw err;
        console.log("1 venda atualizada");
        res.redirect("/");
    });
});

app.post("/vendas/delete/:id", function(req, res) {
    var id = req.params.id;

    var deleteQuery = `DELETE FROM Vendas WHERE ID = ?`;

    con.query(deleteQuery, [id], function (err, result) {
        if (err) throw err;
        console.log("1 venda deletada");
        res.redirect("/");
    });
});

app.post("/compras/add", function(req, res) {
    var clienteId = req.body.cliente_id;
    var cartaId = req.body.carta_id;
    var quantidade = req.body.quantidade;
    var preco = req.body.preco;
    var dataCompra = req.body.data_compra;

    var insert = `INSERT INTO Compras (ClienteID, CartaID, Quantidade, Preco, DataCompra) VALUES (?, ?, ?, ?, ?)`;

    con.query(insert, [clienteId, cartaId, quantidade, preco, dataCompra], function (err, result) {
        if (err) throw err;
        console.log("1 compra inserida");
        res.redirect("/");
    });
});

app.post("/compras/edit", function(req, res) {
    var id = req.body.id;
    var clienteId = req.body.cliente_id;
    var cartaId = req.body.carta_id;
    var quantidade = req.body.quantidade;
    var preco = req.body.preco;
    var dataCompra = req.body.data_compra;

    var update = `UPDATE Compras SET ClienteID=?, CartaID=?, Quantidade=?, Preco=?, DataCompra=? WHERE ID=?`;

    con.query(update, [clienteId, cartaId, quantidade, preco, dataCompra, id], function (err, result) {
        if (err) throw err;
        console.log("1 compra atualizada");
        res.redirect("/");
    });
});

app.post("/compras/delete/:id", function(req, res) {
    var id = req.params.id;

    var deleteQuery = `DELETE FROM Compras WHERE ID = ?`;

    con.query(deleteQuery, [id], function (err, result) {
        if (err) throw err;
        console.log("1 compra deletada");
        res.redirect("/");
    });
});

app.listen(3000, function(){
    console.log("SERVIDOR ATIVO, ACESSE: http://localhost:3000");
});
