import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from'@mui/material/TableBody';
import TableRow from'@mui/material/TableRow';
import TableCell from'@mui/material/TableCell';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { ThemeProvider } from'@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import { theme } from '@/shared/utils/styles'
import { useParams } from "react-router-dom"

export default function Characteristics({ symptoms, answeredQuestions, handleAnsweredQuestions }) {
    const [symmetric, setSymmetric] = React.useState('')
    const [severity, setSeverity] = React.useState('')
    const [onset, setOnset] = React.useState('')
    const [worsen, setWorsen] = React.useState('')
    const [family, setFamily] = React.useState('')
    const [value, setValue] = React.useState('')

    const { question } = useParams();
    const symptom = symptoms[question - 1]

    const { t } = useTranslation("translations")

    const handleSymmetric = (event) => {
        setSymmetric(event.target.value)
    }

    const handleSeverity = (event) => {
        setSeverity(event.target.value)
    }

    const handleOnset = (event) => {
        setOnset(event.target.value)
    }

    const handleWorsen = (event) => {
        setWorsen(event.target.value)
    }

    const handleFamily = (event) => {
        setFamily(event.target.value)
    }

    const handleValue = (event) => {
        setValue(event.target.value)
    }

    const updateAnswers = () => {
        answeredQuestions.push(
            {
                name: symptom.name,
                symmetry_answer: symmetric,
                variability_answer: severity,
                age_onset_answer: onset,
                progressive_answer: worsen,
                family_answer: family,
                value_answer: value
            }
        )

        return answeredQuestions
    }

    // const question = {
    //     name: "headache",
    //     display_name: "headache",
    //     description: "opis",
    //     media: true,
    //     group: "head",
    //     can_be_symmetric: true,
    //     can_have_severity_over_time: true,
    //     can_have_age_of_symptom_onset: true,
    //     can_worsen_over_time: true,
    //     can_other_family_members_have_it: true,
    // }
    
    return (
        <ThemeProvider theme={theme}>
            { console.log(symptom.name) }
            <Typography variant="h3">{ symptom.name }</Typography>
                <TableContainer sx={{ width: '100%' }}>
                    <Table>
                        <TableBody>
                            { symptom.can_be_symmetric && symptom.name !== "CK" &&
                                <TableRow key="can_be_symmetric" >
                                    <TableCell>
                                        {t('questions.symmetric')}
                                    </TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            name="symmetric-question"
                                            value={symmetric}
                                            onChange={handleSymmetric}
                                        >   
                                            <FormControlLabel value="symetryczne" control={<Radio />} label={t('questions.yes')} />
                                            <FormControlLabel value="asymetryczne" control={<Radio />} label={t('questions.no')} />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                            }
                            { symptom.can_be_variable_over_time && symptom.name !== "CK" &&
                                <TableRow key="can_be_variable_over_time" >
                                    <TableCell>
                                        {t('questions.severity')}
                                    </TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            name="severity-question"
                                            value={severity}
                                            onChange={handleSeverity}
                                        >   
                                            <FormControlLabel value="zmienne" control={<Radio />} label={t('questions.variable')} />
                                            <FormControlLabel value="stałe" control={<Radio />} label={t('questions.persistent')} />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                            }
                            { symptom.can_have_age_of_symptom_onset && symptom.name !== "CK" &&
                                <TableRow key="can_have_age_of_symptom_onset" >
                                    <TableCell>
                                        {t('questions.onset')}
                                    </TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            name="onset-question"
                                            value={onset}
                                            onChange={handleOnset}
                                        >
                                            <FormControlLabel value="od urodzenia" control={<Radio />} label="0" />
                                            <FormControlLabel value="poniżej 10 roku życia" control={<Radio />} label="1-10" />
                                            <FormControlLabel value="od 10 do 20 roku życia" control={<Radio />} label="11-20" />
                                            <FormControlLabel value="od 20 do 30 roku życia" control={<Radio />} label="21-30" />
                                            <FormControlLabel value="od 30 do 50 roku życia" control={<Radio />} label="31-50" />
                                            <FormControlLabel value="powyżej 50 roku życia" control={<Radio />} label="> 50" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                            }
                            { symptom.can_worsen_over_time && symptom.name !== "CK" &&
                                <TableRow key="can_worsen_over_time" >
                                    <TableCell>
                                        {t('questions.worsen')}
                                    </TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            name="worsen-question"
                                            value={worsen}
                                            onChange={handleWorsen}
                                        >
                                            <FormControlLabel value="dni" control={<Radio />} label={t('questions.days')} />
                                            <FormControlLabel value="tygodni" control={<Radio />} label={t('questions.weeks')} />
                                            <FormControlLabel value="miesięcy" control={<Radio />} label={t('questions.months')} />
                                            <FormControlLabel value="lat" control={<Radio />} label={t('questions.years')} />
                                            <FormControlLabel value="stałe" control={<Radio />} label={t('questions.constant')} />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                            }
                            { symptom.can_exist_in_family && symptom.name !== "CK" &&
                                <TableRow key="can_exist_in_family" >
                                    <TableCell>
                                        {t('questions.family')}
                                    </TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            name="family-question"
                                            value={family}
                                            onChange={handleFamily}
                                        >
                                            <FormControlLabel value="tak" control={<Radio />} label={t('questions.yes')} />
                                            <FormControlLabel value="nie" control={<Radio />} label={t('questions.no')} />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                            }
                            { symptom.name === "CK" &&
                                <TableRow key="CK" >
                                    <TableCell>
                                        {t('questions.CK')}
                                    </TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            name="CK-question"
                                            value={value}
                                            onChange={handleValue}
                                        >
                                            <FormControlLabel value="tak" control={<Radio />} label={t('questions.yes')} />
                                            <FormControlLabel value="nie" control={<Radio />} label={t('questions.no')} />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" onClick={() => handleAnsweredQuestions(updateAnswers())}>Next</Button>
        </ThemeProvider>
    )
}

//ck jako oddzielny symptom, wtedy pytam o poziom CK

// po odpowiedzeniu na wszystkie pytania request na /disease/from_symptoms i zwrócone wartości wysłane w pierwszym parametrze /symptoms/recommend razem z odpowiedziami na pytania <--- powtarzalny proces
// gdy dostane 204 to wyświetlenie ekranu rezultatu i wyświetlenie chorób otrzymanych z /disease/from_symptoms