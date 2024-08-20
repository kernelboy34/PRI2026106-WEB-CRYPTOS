const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const PORT = 3030;


const url = 'url de mongo lo cambian';
const dbName = 'bot_de_tradings';

// Middleware para conectar a la base de datos antes de manejar las solicitudes
app.use(cors());

app.use(async (req, res, next) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    req.db = db;
    next();
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.get('/obtener_precios_cripto', async (req, res) => {
  const { resul } = req.query;
  
  try {
    const db = req.db;
    const coleccion = db.collection('cripto_consulta');

    // Consultar los datos en la colección
    const resultado = await coleccion.find({ activo: resul }).toArray();
    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.status(404).json({ error: "El activo especificado no fue encontrado." });
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});



