// Symptoms/index.jsx
import symptomsService from '@/App/services/symptoms';
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

// red flags can be defined as single symptomps (like ból dupy)
// or as composition of symptoms (CK1 but only combined with CK2)
const redFlags = [['CK1', 'CK2'], ['ból dupy']]

function redFlagPopUp(detectedRedFlags) {
    const formattedRedFlags = detectedRedFlags.map(redFlag => `<li>${redFlag}</li>`).join('');
    Swal.fire({
        title: 'Wykryto symptom, krytyczny dla życia!',
        html: `
        Symptomy sklasyfikowane jako groźne dla życia:<br>
            <ul style="text-align: left;">${formattedRedFlags}</ul>
        Prosimy o udanie się do najbliższego szpitala.
        `,
        icon: 'warning',
        confirmButtonText: 'Rozumiem'
    });
}

function checkRedFlag(newSymptoms) {
    let newSymptomsNames = newSymptoms.map(obj => obj.name);
    let redFlagsDetected = []
    for (let redFlagCompIdx = 0; redFlagCompIdx < redFlags.length; redFlagCompIdx++) {
        let shouldBeAdded = true;
        const redFlagSymptomsComposition = redFlags[redFlagCompIdx];
        for (let redFlagSymptomIdx = 0; redFlagSymptomIdx < redFlagSymptomsComposition.length; redFlagSymptomIdx++) {
            const redFlagSymptom = redFlagSymptomsComposition[redFlagSymptomIdx];
            if (!newSymptomsNames.includes(redFlagSymptom)) {
                shouldBeAdded = false;
            }
        }
        if (shouldBeAdded) {
            redFlagsDetected.push(redFlagSymptomsComposition)
        }
    }

    if (redFlagsDetected.length > 0) {
        redFlagPopUp(redFlagsDetected);
    }
}

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
    checkRedFlag(newValue);
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