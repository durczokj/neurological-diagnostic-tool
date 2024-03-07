import { createGlobalStyle } from 'styled-components'

import { color, font } from '@/shared/utils/styles'

export default createGlobalStyle`
    html, body, #root {
        height: 100%;
        min-height: 100%;
        min-width: 768px;
    }

    body {
        color: ${color.textDark};
        ${font.size(16)};
        ${font.regular};
        background: ${color.supplementaryBackground};
        margin: 0;
    }

    #root {
        display: flex;
        flex-direction: column;
    }

    button {
        background: none;
        border: none;
    }

    button,
    input,
    select,
    textarea {
        ${font.regular};
    }
`;