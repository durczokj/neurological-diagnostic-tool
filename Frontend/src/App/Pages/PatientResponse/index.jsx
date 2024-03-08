import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

const PatientResponse = () => {
  const location = useLocation();
  const groups = location.state?.groups || [];

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
            Na podstawie wprowadzonych objawów, istnieje prawdopodobieństwo, że cierpisz na chorobę należącą do jednej z poniższych grup. Zalecamy skonsultowanie się z lekarzem w celu uzyskania dokładniejszej diagnozy i odpowiedniego leczenia.
          </Typography>
          {groups.map((group, index) => (
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
                <strong style={{ fontWeight: 'bold' }}> {`Grupa Chorób: `}</strong>{group.group}
                <strong style={{ fontWeight: 'bold' }}>{`\nLiczba pasujących objawów: `}</strong>{group.matching_symptoms_count}
            </Typography>
          ))}
          
        </Box>
      </Container>
    </>
  );
};

export default PatientResponse;