import { MODULE_FRAGMENT } from "./fragments";

export const homeQuery = `*[_type == "home"][0]{
    ...,
    ${MODULE_FRAGMENT}
}`;

export const pageQuery = `*[_type == "page" && slug.current == $slug][0]{
    ...,
    ${MODULE_FRAGMENT}
}`;
