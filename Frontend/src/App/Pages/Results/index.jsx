import * as React from 'react';
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

export default function Symptoms({ diseases }) {

    const [value, setValue] = React.useState([])

    const { t } = useTranslation("translations")
    
    return (
        <React.Fragment>
            {console.log(diseases)}
        </React.Fragment>
    )
}
