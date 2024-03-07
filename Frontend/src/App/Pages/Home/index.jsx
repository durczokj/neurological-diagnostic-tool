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
    <>
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#0C2865',
          color: 'white',
          padding: '1rem',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <Typography variant="h4" align="center" style={{ fontWeight: 'bold' }}>
          Witaj! Powiedz nam co Ci dolega?
        </Typography>
      </Box>
      <Container style={{ marginTop: '6rem' }}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography
            variant="body1"
            gutterBottom
            style={{
              backgroundColor: '#f0f0f0',
              padding: '1rem',
              borderRadius: '1rem',
              maxWidth: '80%',
              alignSelf: 'flex-start',
            }}
          >
            Cześć, jestem czatem Warszawskiego Uniwersytetu Medycznego! A Ty kim jesteś?
          </Typography>
          <Box mt={2} display="flex" flexDirection="column" alignItems="flex-end">
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: '1rem', maxWidth: '80%', alignSelf: 'flex-end' }}
              onClick={() => handleSelectUser('patient')}
            >
              Pacjentem
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ maxWidth: '80%', alignSelf: 'flex-end' }}
              onClick={() => handleSelectUser('doctor')}
            >
              Lekarzem
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;