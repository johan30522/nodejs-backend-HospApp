const express = require('express');
//crea el servidor de express
const app = express();
const { dbConnection } = require('./db/config');

const cors = require('cors');
require('dotenv').config();


//CORS
app.use(cors());

//Se inicializa la conexion a la base de datos
dbConnection();



//rutas
app.get('/', (req, res) => {
    res.status(400).json({
        ok: true,
        msg: 'hola mundo'
    })
});


//mongodb+srv://johan_01:a30522@mycluster.mt4ib.mongodb.net/test


app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
})