import React, { useState, Fragment, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Paper
} from '@mui/material'
import SignIn from './Pages/Login'
import Characteristics from './Pages/Characteristics'
import Symptoms from './Pages/Symptoms'
import AdminSymptoms from './Pages/admin/Symptoms'
// import AdminDiseases from './Pages/admin/Diseases'
import AdminCharacteristics from './Pages/admin/Characteristics'

import './fontStyles.css'

const App = () => {

  const navigate = useNavigate()

  const [symptoms, setSymptoms] = useState([])
  const [choices, setChoices] = useState([])
  const [questionNumber, setQuestionNumber] = useState(1)
  const [answeredQuestions, setAnsweredQuestions] = useState([])

  useEffect(() => {
    setSymptoms([{
      name: "ból głowy",
      display_name: "ból głowy",
      description: "gdy boli cie glowa",
      media: "nic na razie",
      group: "glowa",
      can_be_symmetric: false,
      can_be_variable_over_time: true,
      can_have_age_of_symptom_onset: true,
      can_worsen_over_time: true,
      can_exist_in_family: true
    },
    {
      name: "ból dupy",
      display_name: "ból dupy",
      description: "gdy boli cie dupa",
      media: "nic na razie",
      group: "dupa",
      can_be_symmetric: false,
      can_be_variable_over_time: true,
      can_have_age_of_symptom_onset: true,
      can_worsen_over_time: true,
      can_exist_in_family: true
    },
    {
      name: "CK",
      display_name: "CK",
      description: "CK"
    }])
  }, [])

  const renderQuestionsScreen = async (choices) => {

    setChoices(choices)

    navigate(`/characteristics/${questionNumber}`)
    setQuestionNumber(questionNumber + 1)
  }

  const handleAnsweredQuestions = (answers) => {
    setAnsweredQuestions(answers)
    console.log(answers)
    navigate(`/characteristics/${questionNumber}`)
    setQuestionNumber(questionNumber + 1)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mb: 4, width: '75%', height: '75vh' }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
           <Routes>
              <Route path="/login" element={ <SignIn /> } />
              <Route path="/select" element={ <Symptoms symptoms={symptoms} renderQuestionsScreen={renderQuestionsScreen}/> } />
              <Route path="/characteristics/:question" element={ <Characteristics symptoms={choices} answeredQuestions={answeredQuestions} handleAnsweredQuestions={handleAnsweredQuestions} /> } />
              <Route path="/admin/symptoms" element={ <AdminSymptoms /> } />
{/*               <Route path="/admin/diseases" element={ <AdminDiseases /> } /> */}
              <Route path="/admin/characteristics" element={ <AdminCharacteristics /> } />
          </Routes>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default App