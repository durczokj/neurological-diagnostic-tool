// Characteristics/index.jsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const Characteristics = ({ symptoms, answeredQuestions, handleAnsweredQuestions }) => {
  const [symmetric, setSymmetric] = React.useState('');
  const [severity, setSeverity] = React.useState('');
  const [onset, setOnset] = React.useState('');
  const [worsen, setWorsen] = React.useState('');
  const [family, setFamily] = React.useState('');
  const [value, setValue] = React.useState('');
  const { question } = useParams();
  const symptom = symptoms[question - 1];
  const { t } = useTranslation('translations');

  const handleAnswer = (answer, setAnswer) => {
    setAnswer(answer);
  };

  const updateAnswers = () => {
    answeredQuestions.push({
      name: symptom.name,
      symmetry_answer: symmetric,
      variability_answer: severity,
      age_onset_answer: onset,
      progressive_answer: worsen,
      family_answer: family,
      value_answer: value,
    });
    return answeredQuestions;
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
          fontFamily: 'Calibri Light',
        }}
      >
        <Typography variant="h4" align="center" style={{ fontWeight: 'bold' }}>
          {symptom.name}
        </Typography>
      </Box>
      <Container style={{ marginTop: '6rem', fontFamily: 'Calibri Light' }}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          {symptom.can_be_symmetric && symptom.name !== 'CK' && (
            <Box mt={2}>
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
                {t('questions.symmetric')}
              </Typography>
              <Box mt={1} display="flex" justifyContent="flex-end" width="100%">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '1rem', fontFamily: 'Calibri Light' }}
                  onClick={() => handleAnswer('symetryczne', setSymmetric)}
                >
                  {t('questions.yes')}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ fontFamily: 'Calibri Light' }}
                  onClick={() => handleAnswer('asymetryczne', setSymmetric)}
                >
                  {t('questions.no')}
                </Button>
              </Box>
            </Box>
          )}
          {/* Repeat the above pattern for other questions */}
          {/* ... */}
          <Box mt={2} display="flex" justifyContent="flex-end" width="100%">
            <Button
              variant="contained"
              color="primary"
              style={{ fontFamily: 'Calibri Light' }}
              onClick={() => handleAnsweredQuestions(updateAnswers())}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Characteristics;