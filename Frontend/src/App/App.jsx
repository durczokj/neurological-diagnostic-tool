import { useState, Fragment } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Container
} from '@mui/material'
import SignIn from './Pages/Login'

import BaseStyles from './BaseStyles'

import './fontStyles.css'

const App = () => {

  const { t } = useTranslation("translations")

  return (
    <Container>
      <Routes>
        <Route path="/login" element={ <SignIn /> } /> 
      </Routes>
    </Container>
  )
}

export default App