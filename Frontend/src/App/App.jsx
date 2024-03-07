import React, { useState, Fragment } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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

import BaseStyles from './BaseStyles'

import './fontStyles.css'

const App = () => {

  const { t } = useTranslation("translations")

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
      <Container component="main" sx={{ mb: 4, width: '100%' }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
           <Routes>
              <Route path="/login" element={ <SignIn /> } />
              <Route path="/characteristics" element={ <Characteristics /> } />
              <Route path="/admin/symptoms" element={ <Symptoms /> } />
          </Routes>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default App