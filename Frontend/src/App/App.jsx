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
import Home from './Pages/Home'
import symptomsService from './services/symptoms'

import './fontStyles.css'

const App = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const [diseases, setDiseases] = useState([])
  const [symptoms, setSymptoms] = useState([])
  const [choices, setChoices] = useState([])
  const [questionNumber, setQuestionNumber] = useState(1)
  const [answeredQuestions, setAnsweredQuestions] = useState([])

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
            Company name2
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mb: 4, width: '75%', height: '75vh' }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
           <Routes>
              <Route path="/login" element={ <SignIn /> } />
              <Route path="/select" element={ <Symptoms symptoms={symptoms} renderQuestionsScreen={renderQuestionsScreen}/> } />
              <Route path="/characteristics/:question" element={ <Characteristics symptoms={choices} answeredQuestions={answeredQuestions} handleAnsweredQuestions={handleAnsweredQuestions} /> } />
              <Route path="/results" element={ <Results diseases={diseases} /> } />
              <Route path="/home" element={ <Home user={user} setUser={setUser} /> } />
          </Routes>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default App