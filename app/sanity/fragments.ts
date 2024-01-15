import groq from "groq";

export const INTERNAL_LINK_FRAGMENT = groq`
  (_type == "linkInternal") => {
    (reference->_type == "page") => {
      "to": "/pages/" + reference->slug.current
    },
  }`;

export const BODY_FRAGMENT = groq`
  body[]{
    ...,
    markDefs[]{
      ...,
      ${INTERNAL_LINK_FRAGMENT}
    },
    buttons[]{
      ...,
      ${INTERNAL_LINK_FRAGMENT}
    }
  }`;

export const MODULE_FRAGMENT = groq`modules[]{
    ...,
    colorTheme->,
    ${BODY_FRAGMENT}
  }`;
