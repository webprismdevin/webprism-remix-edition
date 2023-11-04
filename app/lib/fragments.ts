import groq from "groq";

export const MODULE_FRAGMENT = groq`
modules[]{
    ...,
    colorTheme->,
    (_type == 'columns') => {
        ...,
        colorTheme->,
        columns[]{
            ...,
            colorTheme->,
        }
    },
}`;
