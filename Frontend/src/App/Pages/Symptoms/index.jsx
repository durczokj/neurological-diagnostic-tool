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
    CardMedia
} from '@mui/material'

import { useTranslation } from 'react-i18next'

export default function Symptoms({ symptoms, renderQuestionsScreen }) {

    const [value, setValue] = React.useState([])

    const { t } = useTranslation("translations")
    
    return (
        <React.Fragment>
            <Grid container spacing={10}>
                <Grid item xs={6}>
                    <Box
                        height={"50vh"}
                        width={"70%"}
                        alignItems="center"
                    >
                        {value.length !== 0 ? value[value.length - 1].description : ""}
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ maxWidth: "30%"}}>
                        <CardMedia
                            component="img"
                            height="50vh"
                            image="@/App/assets/pol_pl_Masc-na-bol-dupy-w-pudeleczku-2973_4.jpg"
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
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} label="Symptom" placeholder={t('symptoms.choose')}/>}
            />
            <Button variant="contained" onClick={() => renderQuestionsScreen(value)}>Next</Button>
        </React.Fragment>
    )
}
