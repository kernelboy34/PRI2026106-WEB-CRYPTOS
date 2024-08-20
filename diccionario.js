const axios = require('axios');

// URL de la API
const apiUrl = 'http://localhost:3030/obtener_precios_cripto';

// Función para obtener los datos del activo bitcoin
async function obtenerDatosBitcoin() {
  try {
    // Realizar la solicitud GET a la API
    const response = await axios.get(apiUrl, {
      params: {
        resul: 'bitcoin'
      }
    });

    // Extraer los datos relevantes del activo bitcoin y formar un objeto de datos
    const datosBitcoin = response.data.map(({ activo, precio }) => ({
      activo,
      precio
    }));

    // Devolver los datos como un objeto
    return {
      bitcoin: datosBitcoin
    };
  } catch (error) {
    // Manejar cualquier error que pueda ocurrir durante la solicitud
    console.error('Error al obtener los datos del activo bitcoin:', error);
    throw error;
  }
}

// Exportar la función para que pueda ser utilizada en otros archivos
module.exports = {
  obtenerDatosBitcoin
};

