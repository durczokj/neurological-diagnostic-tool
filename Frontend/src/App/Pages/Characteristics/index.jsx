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
import { ThemeProvider } from'@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import { theme } from '@/shared/utils/styles'

export default function Characteristics() {
    const [symmetric, setSymmetric] = React.useState('') //react hook
    const [severity, setSeverity] = React.useState('')
    const [onset, setOnset] = React.useState('')
    const [worsen, setWorsen] = React.useState('')
    const [family, setFamily] = React.useState('')

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

    const question = {
        name: "headache",
        display_name: "headache",
        description: "opis",
        media: true,
        group: "head",
        can_be_symmetric: true,
        can_have_severity_over_time: true,
        can_have_age_of_symptom_onset: true,
        can_worsen_over_time: true,
        can_other_family_members_have_it: true,
    }
    
    return (
        <ThemeProvider theme={theme}>
            <TableContainer>
                <Table>
                    <TableBody>
                        { question.can_be_symmetric && 
                            <TableRow key="can_be_symmetric" >
                                <TableCell>
                                    <Grid container alignItems="center" spacing={4}>
                                        <Grid item>
                                            {t('questions.symmetric')}
                                        </Grid>
                                        <Grid item>
                                            <RadioGroup
                                                row
                                                name="symmetric-question"
                                                value={symmetric}
                                                onChange={handleSymmetric}
                                            >   
                                                <FormControlLabel value="symetryczne" control={<Radio />} label={t('questions.yes')} />
                                                <FormControlLabel value="asymetryczne" control={<Radio />} label={t('questions.no')} />
                                            </RadioGroup>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        }
                        { question.can_have_severity_over_time && 
                            <TableRow key="can_have_severity_over_time" >
                                <TableCell>
                                    <Grid container alignItems="center" spacing={4}>
                                        <Grid item>
                                            {t('questions.severity')}
                                        </Grid>
                                        <Grid item>
                                            <RadioGroup
                                                row
                                                name="severity-question"
                                                value={severity}
                                                onChange={handleSeverity}
                                            >   
                                                <FormControlLabel value="zmienne" control={<Radio />} label={t('questions.variable')} />
                                                <FormControlLabel value="stałe" control={<Radio />} label={t('questions.persistent')} />
                                            </RadioGroup>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        }
                        { question.can_have_age_of_symptom_onset && 
                            <TableRow key="can_have_age_of_symptom_onset" >
                                <TableCell>
                                    <Grid container alignItems="center" spacing={4}>
                                        <Grid item>
                                            {t('questions.onset')}
                                        </Grid>
                                        <Grid item>
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
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        }
                        { question.can_worsen_over_time && 
                            <TableRow key="can_worsen_over_time" >
                                <TableCell>
                                    <Grid container alignItems="center" spacing={4}>
                                        <Grid item>
                                            {t('questions.worsen')}
                                        </Grid>
                                        <Grid item>
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
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        }
                        { question.can_other_family_members_have_it && 
                            <TableRow key="can_other_family_members_have_it" >
                                <TableCell>
                                    <Grid container alignItems="center" spacing={4}>
                                        <Grid item>
                                            {t('questions.family')}
                                        </Grid>
                                        <Grid item>
                                            <RadioGroup
                                                row
                                                name="family-question"
                                                value={family}
                                                onChange={handleFamily}
                                            >
                                                <FormControlLabel value="tak" control={<Radio />} label={t('questions.yes')} />
                                                <FormControlLabel value="nie" control={<Radio />} label={t('questions.no')} />
                                            </RadioGroup>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    )
}