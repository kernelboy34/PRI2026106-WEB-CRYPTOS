import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import Title from './Title';

export default function Chart() {
  const theme = useTheme();
  const [crypto, setCrypto] = useState('bitcoin');
  const [customCryptoData, setCustomCryptoData] = useState([]);
  const [coinGeckoData, setCoinGeckoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('both');

  const handleCryptoChange = (event) => {
    setCrypto(event.target.value);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  useEffect(() => {
    const fetchCustomData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getCoinsPrice', {
          params: {
            resul: crypto,
          },
        });
        const prices = response.data.map((item) => item.precio);
        setCustomCryptoData(prices);
      } catch (error) {
        setError('Error al cargar los datos de la API personalizada');
      }
    };

    const fetchCoinGeckoData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: '30', // Obtener datos de los últimos 30 días
          },
        });
        const prices = response.data.prices.map((price) => price[1]);
        setCoinGeckoData(prices);
      } catch (error) {
        setError('Error al cargar los datos de CoinGecko');
      }
    };

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([fetchCustomData(), fetchCoinGeckoData()]);
      setLoading(false);
    };

    fetchData();
  }, [crypto]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  const maxLength = Math.max(customCryptoData.length, coinGeckoData.length);
  const xData = Array.from({ length: maxLength }, (_, i) => i + 1);

  const seriesData = [];
  if (viewMode === 'both' || viewMode === 'custom') {
    seriesData.push({
      data: customCryptoData,
      label: 'API Personalizada',
      valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
    });
  }
  if (viewMode === 'both' || viewMode === 'coingecko') {
    seriesData.push({
      data: coinGeckoData,
      label: 'CoinGecko',
      valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
    });
  }

  return (
    <React.Fragment>
      <Container>
        <Title>Metricas de hoy</Title>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Criptomoneda</InputLabel>
            <Select value={crypto} onChange={handleCryptoChange} label="Criptomoneda">
              <MenuItem value="bitcoin">Bitcoin</MenuItem>
              <MenuItem value="pepecoin">Pepecoin</MenuItem>
              <MenuItem value="ethereum">Ethereum</MenuItem>
            </Select>
          </FormControl>
          <Box>
            <Button variant="contained" color="primary" onClick={() => handleViewModeChange('custom')} sx={{ mr: 1 }}>
              API Personalizada
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleViewModeChange('coingecko')} sx={{ mr: 1 }}>
              CoinGecko
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleViewModeChange('both')}>
              Ambas
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: '100%', height: '500px', flexGrow: 1, overflow: 'hidden'}}>
          <LineChart
            xAxis={[{ data: xData }]}
            series={seriesData}
            height={500}
            margin={{ top: 10, bottom: 40, left: 50 }}
            lineProps={{
              strokeWidth: 2,
            }}
            yAxis={[{
              label: 'Precio (USD)',
              scaleType: 'linear',
              valueFormatter: (value) => value.toFixed(),
            }]}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}
