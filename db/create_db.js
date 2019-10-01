var db = require('mysql');

var conn = db.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "crudTeste"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Conectado!");
    conn.query("CREATE DATABASE crudTeste", function(err,result){
        if(err) throw err;
        console.log("Banco criado sucesso!!!");
    var sql = "CREATE TABLE veiculos (id int AUTO_INCREMENT PRIMARY KEY,"+ "veiculo varchar(150),"+
        "marca varchar(150),"+ "ano int,"+ "descricao text,"+ "vendido boolean,"+
        "created datetime,"+ "updated datetime)";
    conn.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Tabela criada com sucesso!");
    })
    })
})