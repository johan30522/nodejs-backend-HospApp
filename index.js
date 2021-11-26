const express = require('express');
//crea el servidor de express
const app = express();
const { dbConnection } = require('./db/config');

const cors = require('cors');
require('dotenv').config();


//CORS
app.use(cors());


//Lectura y parseo del body
app.use(express.json());


//Se inicializa la conexion a la base de datos
dbConnection();

//rutas
app.use('/api/usuario', require('./routes/usuario'));
//rutas
app.use('/api/auth', require('./routes/auth'));






//mongodb+srv://johan_01:a30522@mycluster.mt4ib.mongodb.net/test


app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
})