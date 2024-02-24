import { useState, Fragment } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import BaseStyles from './BaseStyles'

import './fontStyles.css'

const App = () => {

  const { t } = useTranslation("translations")

  return (
    <div style={{fontFamily: "HelveticaNow-Regular", fontWeight: "normal", fontSize: 30}}>{ t('app.helloWorld') }</div>
  )
}

export default App