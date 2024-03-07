import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const HomePage = ({ setUser }) => {
  const navigate = useNavigate();

  const handleSelectUser = (userType) => {
    setUser(userType);
    navigate('/select');
  };

  return (
    <Container maxWidth="sm" style={{ backgroundColor: '#0C2865', color: 'white', height: '100vh', paddingTop: '10vh' }}>
      <Typography variant="h2" gutterBottom align="center" style={{ fontWeight: 'bold' }}>
        Witaj! Powiedz nam co Ci dolega?
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6" gutterBottom>
          Cześć, jestem czatem Warszawskiego Uniwersytetu Medycznego! A Ty kim jesteś?
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '1rem', marginBottom: '1rem' }}
            onClick={() => handleSelectUser('patient')}
          >
            Pacjentem
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSelectUser('doctor')}
          >
            Lekarzem
          </Button>
        </Box>
        {/* Insert the graphic element here if needed */}
      </Box>
    </Container>
  );
};

export default HomePage;
