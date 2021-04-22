const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('../database/config')





class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.viewsPath = path.join(__dirname, '../views')


        // COnectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Motor de plantilla
        this.views();
    }

    async conectarDB() {
        await dbConnection();

    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directotio Público
        this.app.use(express.static('public'));

        // Parseo body
        this.app.use(express.urlencoded({extended:true}));

        // Json
        

        
        

    
    }

    models() {
        this.app.use(require('./models/server'));
    }

    routes() {
        this.app.use(require('../routes/orders'));
    }

    views() {
        this.app.set("view engine", "ejs");
        this.app.set("views", this.viewsPath);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}



module.exports = Server;