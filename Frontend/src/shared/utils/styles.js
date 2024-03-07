import { css } from 'styled-components';
import Color from 'color';
import { createTheme } from '@mui/material'

export const color = {
    primary: '#3e74db', // Blue
    secondary: '#141d2f', // Dark blue
    third: '#4b6a9b', // Greyish blue

    mainBackground: '#fcfcfc', // Off white
    recessedBackground: '#d5d5d5', // Grey
    supplementaryBackground: '#f6f8ff', // Blueish white
    sidebar: '#eff1ff', // Steel

    textDark: '#545353', // Dark grey
    textLight: '#adaeb5' // Light grey
};

export const sizes = {
    sidebarWidth: 320,
    topbarHeight: 80
};

export const font = {
    regular: 'font-family: "HelveticaNow-Regular"; font-weight: normal;',
    italic: 'font-family: "HelveticaNow-Italic"; font-weight: normal;',
    bold: 'font-family: "HelveticaNow-Bold"; font-weight: normal;',
    boldItalic: 'font-family: "HelveticaNow-Bold-Italic"; font-weight: normal;',
    size: size => `font-size: ${size}px`
};

export const styleUtils = {
    scrollableY: css`
        overflow-x: hidden;
        overflow-y: auto;
    `,
};

export const mixin = {
    darken: (colorValue, amount) =>
        Color(colorValue)
            .darken(amount)
            .string(),
    lighten: (colorValue, amount) =>
        Color(colorValue)
            .lighten(amount)
            .string()
};

export const theme = createTheme({
    typography: {
        fontSize: 12
    }
})