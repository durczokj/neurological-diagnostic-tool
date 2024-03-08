import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';

const DoctorResponse = () => {
  const location = useLocation();
  const diseases = location.state?.diseases || [];

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
          fontFamily: 'Calibri Light',
        }}
      >
        <Typography variant="h4" align="center" style={{ fontWeight: 'bold' }}>
          Wyniki
        </Typography>
      </Box>
      <Container style={{ marginTop: '6rem', fontFamily: 'Calibri Light' }}>
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
            Poniżej znajdziesz listę chorób, które najbardziej pasują do wprowadzonych objawów, uporządkowane według liczby pasujących objawów:
          </Typography>
          {diseases.map((disease, index) => (
            <Typography
              key={index}
              variant="body1"
              gutterBottom
              style={{
                backgroundColor: '#f0f0f0',
                padding: '1rem',
                borderRadius: '1rem',
                maxWidth: '80%',
                alignSelf: 'flex-start',
                whiteSpace: 'pre-line',
              }}
            >
              <strong style={{ fontWeight: 'bold' }}>{`Liczba pasujących objawów: `}{disease.matching_symptoms_count}</strong>
              <strong style={{ fontWeight: 'bold' }}> {`\nNazwa: `}</strong>{disease.name}
              <strong style={{ fontWeight: 'bold' }}>{`\nGrupa Chorób: `}</strong>{disease.group}
              <strong style={{ fontWeight: 'bold' }}>{`\nPodgrupa: `}</strong>{disease.subgroup}
              <strong style={{ fontWeight: 'bold' }}>{`\nOpis: `}</strong>{disease.description}
            </Typography>
          ))}
          <Typography
            variant="body1"
            gutterBottom
            style={{
              backgroundColor: '#f0f0f0',
              padding: '1rem',
              borderRadius: '1rem',
              maxWidth: '80%',
              alignSelf: 'flex-start',
              marginTop: '1rem',
            }}
          >
            Jeśli potrzebujesz skierować pacjenta do specjalisty chorób nerwowo-mięśniowych, kliknij poniższy przycisk, aby uzyskać informacje kontaktowe:
          </Typography>
          <Box mt={2} display="flex" justifyContent="flex-end" width="100%">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/specialist"
              style={{ fontFamily: 'Calibri Light' }}
            >
              Skieruj do specjalisty
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default DoctorResponse;