import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotLoggedIn() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Redirige a la página de inicio de sesión
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        No estás logueado
      </Typography>
      <Typography variant="body1" gutterBottom>
        Por favor, inicia sesión para acceder a esta sección.
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Iniciar Sesión
        </Button>
      </Box>
    </Container>
  );
}
