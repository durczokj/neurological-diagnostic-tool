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
import Results from './Pages/Results'

import diseasesService from './services/diseases'

import './fontStyles.css'

const App = () => {

  const navigate = useNavigate()

  const [diseases, setDiseases] = useState([])
  const [choices, setChoices] = useState([])
  const [questionNumber, setQuestionNumber] = useState(1)
  const [answeredQuestions, setAnsweredQuestions] = useState([])

  const renderQuestionsScreen = (choices) => {

    setChoices(choices)

    navigate(`/characteristics/${questionNumber}`)
    setQuestionNumber(questionNumber + 1)
  }

  const handleAnsweredQuestions = (answers) => {
    setAnsweredQuestions(answers)
    console.log(answers)
    console.log("Question number " + questionNumber)
    console.log("Length: " + choices.length)
    if (questionNumber === choices.length + 1) {
      console.log("dupa")
      diseasesService
        .postSymptoms(answers)
        .then(response => setDiseases(response))
      
      console.log(diseases)

      return
    }
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
      <Container component="main" sx={{ mb: 4, width: '75%', height: '75vh'}}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
           <Routes>
              <Route path="/login" element={ <SignIn /> } />
              <Route path="/select" element={ <Symptoms renderQuestionsScreen={renderQuestionsScreen}/> } />
              <Route path="/characteristics/:question" element={ <Characteristics symptoms={choices} answeredQuestions={answeredQuestions} handleAnsweredQuestions={handleAnsweredQuestions} /> } />
              <Route path="/results" element={ <Results diseases={diseases} /> } />
          </Routes>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default App