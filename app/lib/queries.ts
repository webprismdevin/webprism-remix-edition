export const homeQuery = `*[_type == "home"][0]{
    ...,
    modules[]{
        ...,
        colorTheme->,
    }
}`;
