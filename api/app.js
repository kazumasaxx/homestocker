//モジュールを読み込む
var http = require('http');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var app = express();
//mysqlConnection.jsで作成したconnectionを呼び出す
var connection = require('./mysqlConnection');
//var connection2 = require('./mysqlConnection2');

var serverurl = "/api"
//サーバー作成
var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('Hello js!');
    res.end();
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");     // セキュリティリスク有り
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(express.json());       // to support JSON-encoded bodies

// //クエリ作成
// app.get('/', function (req, res) {
//     console.log("dbの内容を取り出す");
//     //クエリ文
//     connection.query('select * from M_PLCAddress', function (error, results, fields) {
//         if (error) throw error; //errorの場合
//         res.send(results);//画面にresponseとして表示
//         console.log("results: " + results[0].LabelName); //jsonで受け取った場合の値の取得方法
//     });
// });

app.get(serverurl + '/mitem', function (req, res) {
    //クエリ文
    connection.query('select * from m_item', function (error, results, fields) {
        if (error) throw error; //errorの場合
        res.send(results);//画面にresponseとして表示
    });
});

app.get(serverurl + '/stores', function (req, res) {
    //クエリ文
    connection.query('select * from m_store', function (error, results, fields) {
        if (error) throw error; //errorの場合
        res.send(results);//画面にresponseとして表示
    });
});

app.get(serverurl + '/stocks', function (req, res) {
    console.log('apistocks');
    //クエリ文
    connection.query('SELECT stock.id,m_item.name,count FROM homestock.stock left join m_item on m_item.id=stock.`item`;', function (error, results, fields) {
        if (error) {
            console.log('apistocksError');
            throw error; //errorの場合
        }
        console.log('res:' + results);
        res.send(results);//画面にresponseとして表示
    });
});


// app.get('/api/free', function (req, res) {
//     //クエリ文
//     connection.query(req.query.sql, function (error, results, fields) {
//         if (error) throw error; //errorの場合
//         res.send(results);//画面にresponseとして表示
//     });
// });

// app.get('/users', function(req, res) {
//     //クエリ文
//     connection2.query('SELECT * FROM usertable', function (error, results, fields) {
//         if (error) throw error; //errorの場合
//         //console.log(res);
//         res.send(JSON.stringify(results));//画面にresponseとして表示
//     });
//   });

//   app.get('/users/:id', function(req, res) {
//     connection2.query('SELECT * FROM usertable', function (error, results, fields) {
//         if (error) throw error; //errorの場合
//         //res.send(results[0]);//画面にresponseとして表示
//         for (let i = 0; i < results.length; i++) {
//             if (results[i].id == req.params.id) {
//                 res.send(JSON.stringify(results[i]));
//             }
//         }
//     });
// });

app.post('/stock', jsonParser, function (req, res) {
    // console.log(JSON.stringify(req.body));
    console.log("post test");
    console.log(req.body);
    console.log('INSERT INTO `homestock`.`stock` (`item`, `count`, `storeid`) VALUES(' + ',' + req.body.item + ',' + req.body.count + req.body.storeid + ')');
    connection.query('INSERT INTO `homestock`.`stock` (`id`, `item`, `count`, `storeid`) VALUES(' + req.body.id + ',' + req.body.item + ',' + req.body.count + req.body.storeid + ')', function (error, results, fields) {
        if (error) throw error; //errorの場合
        //res.end();
    });
    // res.end();
});

app.post(serverurl + '/changecountnew', jsonParser, function (req, res) {
    // console.log(JSON.stringify(req.body));
    let sql;
    sql = "SELECT MAX(id) AS id FROM homestock.stock WHERE count > 0 AND item = " + req.body.item;
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        if (error) throw error; //errorの場合
        res.send(results);
        //res.end();
    });
    // res.end();
});
app.post(serverurl + '/changecountold', jsonParser, function (req, res) {
    // console.log(JSON.stringify(req.body));
    let sql;
    sql = "SELECT Min(id) AS id FROM homestock.stock WHERE count > 0 AND item = " + req.body.item;
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        if (error) throw error; //errorの場合
        res.send(results);
        //res.end();
    });
    // res.end();
});
app.post(serverurl + '/changecount', jsonParser, function (req, res) {
    // console.log(JSON.stringify(req.body));
    let sql;
    sql = "UPDATE `homestock`.`stock` SET `count` = `count` + " + req.body.count + " WHERE `id` = " + req.body.id;
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        if (error) throw error; //errorの場合
        res.send(results);
        //res.end();
    });
    // res.end();
});
// app.post('/users/:id', function (req, res) {
//     console.log(req.body);
//     connection2.query('INSERT INTO usertable (name,email)VALUES(\'' + req.body.name + '\',\'' + req.body.email + '\')', function (error, results, fields) {
//         if (error) throw error; //errorの場合
//         res.end();
//     });
// });
//サーバー起動。listen()メソッドを実行して8001番ポートで待ち受けする。
app.listen(8001, function () {
    console.log('listening on port 8001');
});