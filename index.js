const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!' +port);



function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : 'localhost',
      port     : '3306',
      user     : 'root',
      password : 'root',
      database : 'crudTeste'
    });
  
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
  }



//retorna todos
router.get('/veiculos',(req,res) => {
    executaQuery('SELECT * FROM veiculos',res);
})

// retorna de acordo com o parametro
router.get('/veiculos/find/q=:parametro',(req,res) => {
  const parametro = req.params.parametro;
  executaQuery(`SELECT * FROM veiculos where concat
  (veiculo,marca,ano,descricao,created,updated) like '%${parametro}%'`,res);
})

// retorna detalhes
router.get('/veiculos/:id?', (req,res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE id='
    + parseInt(req.params.id);
    executaQuery('SELECT * FROM veiculos' + filter,res);
})

//Adciona um novo veiculo na tabela veiculos 
router.post('/veiculos', (req,res) => {
    const veiculo = req.body.veiculo;
    const marca = req.body.marca;
    const ano = req.body.ano;
    const descricao = req.body.descricao;
    const vendido = req.body.vendido;
    executaQuery(`INSERT INTO veiculos(veiculo,marca,ano,descricao,vendido,created,updated) VALUES 
    ('${veiculo}','${marca}','${ano}','${descricao}','${vendido}', NOW(), NOW())`,res);
})

//Atualiza os dados
router.put('/veiculos/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const veiculo = req.body.veiculo;
    const marca = req.body.marca;
    const ano = req.body.ano;
    const descricao = req.body.descricao;
    const vendido = req.body.vendido;
    executaQuery(`UPDATE veiculos SET veiculo='${veiculo}',marca='${marca}',ano='${ano}',descricao='${descricao}'
    ,vendido='${vendido}', updated=NOW() WHERE ID=${id}`, res);
})

//Atualizar so alguns dados
router.patch('/veiculos/:id', (req,res) => {
  const id = parseInt(req.params.id);
  const veiculo = req.body.veiculo;
  const vendido = req.body.vendido;
  executaQuery(`UPDATE veiculos SET veiculo='${veiculo}',vendido='${vendido}', 
  updated=NOW() WHERE ID=${id}`, res);
})

//Apaga o veiculo
router.delete('/veiculos/:id', (req, res) =>{
    executaQuery('DELETE FROM veiculos WHERE ID=' + parseInt(req.params.id), res);
})