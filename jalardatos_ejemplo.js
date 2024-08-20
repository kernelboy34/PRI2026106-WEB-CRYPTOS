const axios = require('axios');


const url = 'http://localhost:3000/obtener_precios_cripto';


axios.get(url)
  .then(response => {
  
    if (response.status === 200) {
      // Obtener los datos de la respuesta
      const data = response.data;
      
      // Procesar los datos
      data.forEach(entry => {
        const activo = entry.activo;
        const fecha = entry.fecha;
        
        // Hacer lo que necesites con estos datos
        console.log(`Activo: ${activo}, Fecha: ${fecha}`);
      });
    } else {
      console.error('Error:', response.status);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
