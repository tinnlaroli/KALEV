require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error(err));

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Configuración y Lecturas',
      version: '1.0.0',
      description: 'Documentación de la API para gestionar configuraciones y lecturas de estado',
    },
  },
  apis: ['./routes/*.js'], // Esto busca los comentarios wwwwde Swagger en las rutas
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
const configuracionRoutes = require('./routes/configuracionRoutes');
const lecturaRoutes = require('./routes/lecturaRoutes');

app.use('/configuracion', configuracionRoutes);
app.use('/lecturas', lecturaRoutes);

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
