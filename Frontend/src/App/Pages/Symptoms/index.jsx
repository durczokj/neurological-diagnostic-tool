// Symptoms/index.jsx
import React, { useState, useEffect } from 'react';
import {
  Button,
  Autocomplete,
  TextField,
  Grid,
  Box,
  Card,
  CardMedia,
  Typography,
  Container,
} from '@mui/material';
import pic from '@/App/assets/pol_pl_Masc-na-bol-dupy-w-pudeleczku-2973_4.jpg';
import { useTranslation } from 'react-i18next';
import { theme } from '@/shared/utils/styles';
import symptomsService from '@/App/services/symptoms';

export default function Symptoms({ renderQuestionsScreen }) {
  const [value, setValue] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const { t } = useTranslation('translations');

  useEffect(() => {
    symptomsService
      .getSymptomsList()
      .then((result) => setSymptoms(result))
      .catch((error) => console.log(error));
  }, []);

  const handleSymptomChange = (event, newValue) => {
    setValue(newValue);
    setSelectedSymptoms(newValue);
  };

  return (
    <React.Fragment>
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
          Najpierw opowiedz o swoich objawach
        </Typography>
      </Box>
      <Container style={{ marginTop: '6rem', fontFamily: 'Calibri Light' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box mt={2} display="flex" justifyContent="flex-start" width="100%">
              <Typography
                variant="body1"
                gutterBottom
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: '1rem',
                  borderRadius: '1rem',
                  maxWidth: '70%',
                  alignSelf: 'flex-start',
                }}
              >
                {t('symptoms.descriptionPlaceholder')}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={1} display="flex" justifyContent="flex-end" width="100%">
              <Autocomplete
                multiple
                onChange={handleSymptomChange}
                id="combo-box-symptoms"
                options={symptoms}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                sx={{ width: '70%', pt: 3, pb: 3 }}
                renderInput={(params) => (
                  <TextField {...params} label="Symptom" placeholder={t('symptoms.choose')} />
                )}
              />
            </Box>
          </Grid>
          {selectedSymptoms.map((symptom, index) => (
            <Grid item xs={12} key={index}>
              <Box mt={1} display="flex" justifyContent="flex-end" width="100%">
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{
                    backgroundColor: '#f0f0f0',
                    padding: '0.5rem',
                    borderRadius: '1rem',
                    maxWidth: '70%',
                    alignSelf: 'flex-end',
                  }}
                >
                  {symptom.name}: {symptom.description}
                </Typography>
              </Box>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                style={{ maxWidth: '120px', maxHeight: '70px', minWidth: '120px', minHeight: '70px' }}
                onClick={() => renderQuestionsScreen(value)}
              >
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}