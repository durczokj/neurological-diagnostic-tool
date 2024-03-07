import * as React from 'react';
// import Button from '@mui/material/Button'
// import Autocomplete from '@mui/material/Autocomplete'
// import TextField from '@mui/material/TextField'
import {
    Button,
    Autocomplete,
    TextField,
    Grid,
    Box,
    Card,
    CardMedia,
    Typography
} from '@mui/material'
import pic from '@/App/assets/pol_pl_Masc-na-bol-dupy-w-pudeleczku-2973_4.jpg'

import { useTranslation } from 'react-i18next'

import { theme } from '@/shared/utils/styles'

import symptomsService from '@/App/services/symptoms'

export default function Symptoms({ renderQuestionsScreen }) {

    const [value, setValue] = React.useState([])
    const [symptoms, setSymptoms] = React.useState([])

    const { t } = useTranslation("translations")

    React.useEffect(() => {
        // setSymptoms([{
        //   name: "ból głowy",
        //   display_name: "ból głowy",
        //   description: "gdy boli cie glowa",
        //   media: "nic na razie",
        //   group: "glowa",
        //   can_be_symmetric: false,
        //   can_be_variable_over_time: true,
        //   can_have_age_of_symptom_onset: true,
        //   can_worsen_over_time: true,
        //   can_exist_in_family: true
        // },
        // {
        //   name: "ból dupy",
        //   display_name: "ból dupy",
        //   description: "gdy boli cie dupa",
        //   media: "nic na razie",
        //   group: "dupa",
        //   can_be_symmetric: false,
        //   can_be_variable_over_time: true,
        //   can_have_age_of_symptom_onset: true,
        //   can_worsen_over_time: true,
        //   can_exist_in_family: true
        // },
        // {
        //   name: "CK",
        //   display_name: "CK",
        //   description: "CK"
        // }])
        symptomsService
            .getSymptomsList()
            .then(result => setSymptoms(result))
            .catch(error => console.log(error))
    }, [])
    
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Box
                        display="flex"
                        height={"50vh"}
                        alignItems="center"
                        sx={{ justifyContent: "center", alignContent: "center" }}
                    >
                        <Typography variant="h6">{value.length !== 0 ? value[value.length - 1].description : t('symptoms.descriptionPlaceholder')}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            image={pic}
                            alt="dupa"
                        />
                    </Card>
                </Grid>
            </Grid>
            <Autocomplete
                multiple
                onChange={(event, newValue) => {
                    console.log(newValue)
                    setValue(newValue)
                }}
                id="combo-box-symptoms"
                options={symptoms}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                sx={{ width: "100%", pt: 3, pb: 3 }}
                renderInput={(params) => <TextField {...params} label="Symptom" placeholder={t('symptoms.choose')}/>}
            />
            <Grid container justifyContent="flex-end">
                <Button variant="contained" style={{maxWidth: '120px', maxHeight: '70px', minWidth: '120px', minHeight: '70px'}} onClick={() => renderQuestionsScreen(value)}>{t("button.next")}</Button>
            </Grid>
        </React.Fragment>
    )
}
