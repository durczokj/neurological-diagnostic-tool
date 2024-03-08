import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

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
              }}
            >
              {`Name: ${disease.name}\nGroup: ${disease.group}\nSubgroup: ${disease.subgroup}\nDescription: ${disease.description}\nMatching Symptoms Count: ${disease.matching_symptoms_count}`}
            </Typography>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default DoctorResponse;