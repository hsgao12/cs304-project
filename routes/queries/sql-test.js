const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'Abcd1234!', 
    database: 'db304'
});
db.connect();
// const handlerSQLTest = () => {
//     // const result = db.query('SELECT * FROM Coach');

//     db.connect(function (err) {
//         if (err) throw err;
//         var p = new Promise((res, rej) => {
//             db.query("SELECT * FROM Coach", function (err, result, fields) {
//                 if (err) throw err;
//                 //console.log(result);
//                 //res.json(result);
//                 //console.log(result);
//                 res(result);
//             });
//         }); 
//         return p;       
//     });
// }

module.exports = {
    handlerSQLTest: function (err) {
        if (err) throw err;
        return new Promise((res, rej) => {
            db.query("SELECT * FROM Coach", function (err, result, fields) {
                if (err) throw err;
                //console.log(result);
                //res.json(result);
                //console.log(result);
                res(result);
            });
        });        
    },
    handlerSQLTest2: function (query, err) {
        if (err) throw err;
        return new Promise((res, rej) => {
            db.query(query, function (err, result, fields) {
                if (err) throw err;
                //console.log(result);
                //res.json(result);
                //console.log(result);
                res(result);
            });
        });        
    }
};