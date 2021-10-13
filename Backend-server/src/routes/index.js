
const { Router, request, response } = require('express');
const router = Router();
const cors = require('cors');
var bodyParser = require('body-parser');
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
router.use(cors(corsOptions));
router.use(bodyParser.json({ limit: '100mb', extended: true }));
router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '34.125.57.253',
    user: 'root',
    password: 'password',
    database: 'Bases2_ProyectoClase',
    port: 33061
});

router.get('/hola', 
    (req,res) => res.json
    (
        {msg: 'bye :D'}
    )
);

router.get("/get-allbanks", (request, response, next) => {
    connection.query('select * from bank', (error, rows) => {
        if (error) {
            console.log(error);
            return
        }
        response.json(rows);
    });
});


module.exports = router;
