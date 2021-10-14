
const { Router, request, response } = require('express');
const router = Router();
const cors = require('cors');
const bcrypt = require("bcryptjs");
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
    connection.query('select * from banks', (error, rows) => {
        if (error) {
            console.log(error);
            return
        }
        response.json(rows);
    });
});


router.get("/getActivesTotalHistory", (request, response, next) => {
    connection.query('select a.active_month, a.register_year, a.active_count, b.bank_name from actives a inner join banks b on (a.bank_id = b.bank_id) order by a.register_year, a.active_month, b.bank_name, a.active_count', (error, rows) => {
        if (error) {
            console.log(error);
            return
        }
        response.json(rows);
    });
});


router.post("/newUser", (request, response, next) => {

    let password_text = request.body.password;
    let passwordcrypt = "";
    const itereador = 10;
    bcrypt.hash(password_text, itereador, (err, passwordcrypt_) => {
        if (err) {
            console.log("Error hasheando:", err);
        } else {
            passwordcrypt = passwordcrypt_
            let consulta = "";
            consulta = consulta + '';
            consulta = consulta + 'insert into users (user, password, firstname, lastname) ';
            consulta = consulta + 'values (';
            consulta = consulta + '\'' + request.body.user + '\', ';
            consulta = consulta + '\'' + passwordcrypt + '\', ';
            consulta = consulta + '\'' + request.body.firstname + '\', ';
            consulta = consulta + '\'' + request.body.lastname + '\')';
            connection.query(consulta, (error, rows) => {
                if (error) {
                    console.log(error);
                    return
                }
                response.json({
                    "msj" : "Usuario registrado correctamente"
                });
            });
        }
    });
 
});

router.post("/login", (request, response, next) => {

    let password_text = request.body.password;
    let consulta = "";
    consulta = consulta + '';
    consulta = consulta + 'select * from users where ';
    consulta = consulta + 'user = \'' + request.body.user + '\'';
    connection.query(consulta, (error, rows) => {
        if (error) {
            console.log(error);
            return
        }
        let usuario_ = rows[0];
        let usuario = {
            user_id: usuario_.user_id,
            user: usuario_.user,
            password: usuario_.password,
            firstname: usuario_.firstname,
            lastname: usuario_.lastname
        }

        bcrypt.compare(password_text, usuario.password, (err, coinciden) => {
            if (err) {
                response.json({
                    "msj" : "Datos de ingreso invalidos"
                });
            } else {
                if (coinciden) {
                    response.json({
                        usuario
                    });
                } else {
                    response.json({
                        "msj" : "Datos de ingreso invalidos"
                    });
                }
            }
        });
    });
 
});


module.exports = router;
