import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, CircularProgress, Alert, Grid, Card, CardContent, Typography, Link, Box } from '@mui/material';
import './estilos.css'; // Importamos el archivo de estilos

export default function ChartWithNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [consulta, setConsulta] = useState('bitcoin');
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10); // Puedes ajustar el límite de resultados por página

  useEffect(() => {
    const fetchNoticias = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/api/noticias_completas', {
          params: {
            resul: consulta,
            skip: skip,
            limit: limit,
          }
        });
        setNoticias(response.data);
        setError(null); // Limpia cualquier error previo
      } catch (error) {
        setError('Error al cargar las noticias');
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, [consulta, skip, limit]);

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setConsulta(busqueda);
    setSkip(0); // Reiniciar el paginador al hacer una nueva búsqueda
  };

  const handleNextPage = () => {
    setSkip(skip + limit);
  };

  const handlePrevPage = () => {
    if (skip - limit >= 0) {
      setSkip(skip - limit);
    }
  };

  if (loading) {
    return (
      <Container className="loading" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="error" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="chart-with-noticias" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Noticias de hoy con web scraping
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          value={busqueda}
          onChange={handleBusquedaChange}
          placeholder="Buscar criptomoneda"
          variant="outlined"
          sx={{ mr: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">Buscar</Button>
      </Box>
      <Grid container spacing={2} className="noticias-container">
        {noticias.map(noticia => (
          <Grid item key={noticia._id} xs={12} sm={6} md={4}>
            <Card className="noticia">
              <CardContent>
                <Typography variant="h6"><strong>Título:</strong> {noticia.titulo}</Typography>
                <Typography variant="body2"><strong>Enlace:</strong> <Link href={noticia.enlace}>{noticia.enlace}</Link></Typography>
                <Typography variant="body2"><strong>Temas:</strong> {noticia.temas}</Typography>
                <Typography variant="body2"><strong>Cripto:</strong> {noticia.cripto}</Typography>
                <Typography variant="body2"><strong>Fecha de Consulta:</strong> {noticia['fecha-consulta']}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box className="pagination" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handlePrevPage} disabled={skip === 0} variant="contained" sx={{ mr: 2 }}>Anterior</Button>
        <Button onClick={handleNextPage} disabled={noticias.length < limit} variant="contained">Siguiente</Button>
      </Box>
    </Container>
  );
}
