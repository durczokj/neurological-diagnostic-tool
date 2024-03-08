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
// import Interview from './Pages/Interview'
// import Healthy from './Pages/Healthy'
import symptomsService from './services/symptoms'
import diseasesService from './services/diseases'
import './fontStyles.css'

const App = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const [diseases, setDiseases] = useState([])
  const [symptoms, setSymptoms] = useState([])
  const [choices, setChoices] = useState([])
  const [questionNumber, setQuestionNumber] = useState(1)
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [currentSymptom, setCurrentSymptom] = useState(null)

  const renderQuestionsScreen = async (choices) => {
    setChoices(choices)
    navigate(`/characteristics/${questionNumber}`)
    setQuestionNumber(questionNumber + 1)
  }

  const handleAnsweredQuestions = (answers) => {
    setAnsweredQuestions(answers)
    console.log(answers)
    console.log("Question number " + questionNumber)
    console.log("Length: " + choices.length)
    if (questionNumber > choices.length) {
      console.log("dupa")
      diseasesService
        .postSymptoms(answers)
        .then(response => {
          setDiseases(response.diseases)
          setCurrentSymptom(response.current_symptom)
          if (response.diseases.length === 0) {
            navigate('/healthy')
          } else {
            navigate('/interview')
          }
        })
      console.log(diseases)
      return
    }
    navigate(`/characteristics/${questionNumber}`)
    setQuestionNumber(questionNumber + 1)
  }

  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/select" element={<Symptoms symptoms={symptoms} renderQuestionsScreen={renderQuestionsScreen} />} />
      <Route path="/characteristics/:question" element={<Characteristics symptoms={choices} answeredQuestions={answeredQuestions} handleAnsweredQuestions={handleAnsweredQuestions} />} />
      <Route path="/results" element={<Results diseases={diseases} />} />
      <Route path="/home" element={<Home user={user} setUser={setUser} />} />
      {/* <Route path="/interview" element={<Interview currentSymptom={currentSymptom} setSymptoms={setSymptoms} />} /> */}
      {/* <Route path="/healthy" element={<Healthy />} /> */}
    </Routes>
  )
}

export default App