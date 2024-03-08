// Characteristics/index.jsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const Characteristics = ({ symptoms, answeredQuestions, handleAnsweredQuestions }) => {
  const [answers, setAnswers] = React.useState({});
  const { question } = useParams();
  const symptom = symptoms[question - 1];
  const { t } = useTranslation('translations');

  const handleAnswer = (questionKey, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionKey]: answer,
    }));
  };

  const updateAnswers = () => {
    const updatedAnswers = {
      name: symptom.name,
      ...answers,
    };
    answeredQuestions.push(updatedAnswers);
    return answeredQuestions;
  };

  const questions = [
    {
      key: 'symmetry_answer',
      text: t('questions.symmetric'),
      options: [
        { label: t('questions.yes'), value: 'symetryczny' },
        { label: t('questions.no'), value: 'asymetryczny' },
      ],
      condition: symptom.can_be_symmetric && symptom.name !== 'CK',
    },
    {
      key: 'variability_answer',
      text: t('questions.severity'),
      options: [
        { label: t('questions.variable'), value: 'zmienne' },
        { label: t('questions.persistent'), value: 'stałe/postępujące' },
      ],
      condition: symptom.can_be_variable_over_time && symptom.name !== 'CK',
    },
    {
      key: 'age_onset_answer',
      text: t('questions.onset'),
      options: [
        { label: '0', value: 'od urodzenia' },
        { label: '1-10', value: 'poniżej 10 roku życia' },
        { label: '11-20', value: 'od 10 do 20 roku życia' },
        { label: '21-30', value: 'od 20 do 30 roku życia' },
        { label: '31-50', value: 'od 30 do 50 roku życia' },
        { label: '> 50', value: 'powyżej 50 roku życia' },
      ],
      condition: symptom.can_have_age_of_symptom_onset && symptom.name !== 'CK',
    },
    {
      key: 'worsen',
      text: t('questions.worsen'),
      options: [
        { label: t('questions.days'), value: 'dni' },
        { label: t('questions.weeks'), value: 'tygodni' },
        { label: t('questions.months'), value: 'miesięcy' },
        { label: t('questions.years'), value: 'lat' },
        { label: t('questions.constant'), value: 'stałe' },
      ],
      condition: symptom.can_worsen_over_time && symptom.name !== 'CK',
    },
    {
      key: 'exists_in_family_answer',
      text: t('questions.family'),
      options: [
        { label: t('questions.yes'), value: 'tak' },
        { label: t('questions.no'), value: 'nie' },
      ],
      condition: symptom.can_exist_in_family && symptom.name !== 'CK',
    },
    {
      key: 'ck_level_answer',
      text: t('questions.CK'),
      options: [
        // options like this
        //     ck_level_answer: Optional[Literal["norma", "powyżej normy do 1000", "od 1000 do 10000", "powyżej 10000",
        { label: t('questions.norm'), value: 'norma' },
        { label: t('questions.aboveNormTo1000'), value: 'powyżej normy do 1000' },
        { label: t('questions.from1000to10000'), value: 'od 1000 do 10000' },
        { label: t('questions.above10000'), value: 'powyżej 10000' }
      ],
      condition: symptom.name === 'CK',
    },
  ];

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
          {questions.map((question) => (
            question.condition && (
              <Box key={question.key} mt={2}>
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
                  {question.text}
                </Typography>
                <Box mt={1} display="flex" justifyContent="flex-end" width="100%">
                  {question.options.map((option) => (
                    <Button
                      key={option.value}
                      variant="contained"
                      color="primary"
                      style={{
                        marginLeft: '1rem',
                        fontFamily: 'Calibri Light',
                        border: answers[question.key] === option.value ? '2px solid #000' : 'none',
                      }}
                      onClick={() => handleAnswer(question.key, option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </Box>
              </Box>
            )
          ))}
{questions.every((question) => !question.condition) && (
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
      {t('questions.noRelevantQuestions')}
    </Typography>
  </Box>
)}
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