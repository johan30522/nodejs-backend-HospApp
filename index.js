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

//directorio publico
app.use(express.static('public'));


//rutas
app.use('/api/usuario', require('./routes/usuario'));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/hospitales', require('./routes/hospital'));

app.use('/api/Medicos', require('./routes/medicos'));

app.use('/api/todo', require('./routes/search'));

app.use('/api/upload', require('./routes/upload'));








//mongodb+srv://johan_01:a30522@mycluster.mt4ib.mongodb.net/test


app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
})