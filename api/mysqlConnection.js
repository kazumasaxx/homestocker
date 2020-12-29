//mysqlモジュールを呼び出します
var mysql = require('mysql');

//DBの定義
var dbConfig = {
    host: '192.168.1.90',
    user: 'homeuser',
    password: 'lazytime',
    database: 'homestock',
    multipleStatements: true
};

var connection;

function handleDisconnect() {
    console.log('create mysql connection');
    connection = mysql.createConnection(dbConfig); //接続する準備

    //接続
    connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); //2秒待ってから処理
        }
    });

    //error時の処理
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });

    module.exports = connection; //connectionを(他のファイルから)requireで呼び出せるようにする
}

handleDisconnect();