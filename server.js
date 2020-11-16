const express = require('express'); 
const mysql = require('mysql');
const cors = require('cors');

const sqlTest = require('./routes/queries/sql-test');

const app = express(); 

// Init body parser 
app.use(express.json({extended: false}));

// Set port
const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use(cors());
app.use(express.json());

app.use("/api/init", require("./routes/init"));

app.get('/checkConnection', (request, response) => {
    //res.send('Connected check passed!');
    // console.log(sqlTest.handlerSQLTest()); 
    console.log('request',request.params);
    sqlTest.handlerSQLTest()
            .then((res, rej) => {
                response.status(200).send(res);
            });
    //console.log(res);
    //res.send(result);
    // res.status(200).send(sqlTest.handlerSQLTest());
});

app.post('/handleSQLQuery', (request, response) => {
    console.log('request',request.body);
    sqlTest.handlerSQLTest2(request.body.sql)
            .then((res, rej) => {
                response.status(200).send(res);
            });
});
app.use("/api/init", require("./routes/init"));
app.use("/api/crud", require("./routes/crud"));
app.use("/api/queries", require("./routes/additionalQueries"));
