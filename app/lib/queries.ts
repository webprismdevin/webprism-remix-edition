export const homeQuery = `*[_type == "home"][0]{
    ...,
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
    }
}`;
