const mongoose = require('mongoose');
const dbConnection = async() => {
    try {
        console.log('mongodb://localhost:27017/test');
        await mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('base de datos on line!!');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos!');
    }
}
module.exports = {
    dbConnection
}