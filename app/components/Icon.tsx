import React from "react";

type IconProps = {
  className?: string;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

export function NavArrowDown({ className, ...props }: IconProps) {
  return (
    <svg
      width="36px"
      height="36px"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={props.color ?? "#141414"}
      className={className}
      {...props}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

export function ArrowRight({ className, ...props }: IconProps) {
  return (
    <svg
      width="36px"
      height="36px"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={props.color ?? "#141414"}
      className={className}
      {...props}
    >
      <path
        d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

export function ArrowLeft({ className, ...props }: IconProps) {
  return (
    <svg
      width="36px"
      height="36px"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={props.color ?? "#141414"}
      className={className}
      {...props}
    >
      <path
        d="M3 12L21 12M3 12L11.5 3.5M3 12L11.5 20.5"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

export function OpenInNew({ ...props }: IconProps) {
  return (
    <svg
      width="36px"
      height="36px"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={props.color ?? "#141414"}
      {...props}
    >
      <path
        d="M21 3L15 3M21 3L12 12M21 3V9"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H11"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
    </svg>
  );
}

export const ListIcon = ({ ...props }: IconProps) => {
  return (
    <svg
      width="36px"
      height="36px"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={props.color ?? "#141414"}
      {...props}
    >
      <path
        d="M8 6L20 6"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M4 6.01L4.01 5.99889"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M4 12.01L4.01 11.9989"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M4 18.01L4.01 17.9989"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M8 12L20 12"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M8 18L20 18"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export const GridIcon = ({ ...props }: IconProps) => {
  return (
    <svg
      width="36px"
      height="36px"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={props.color ?? "#141414"}
      {...props}
    >
      <path
        d="M14 20.4V14.6C14 14.2686 14.2686 14 14.6 14H20.4C20.7314 14 21 14.2686 21 14.6V20.4C21 20.7314 20.7314 21 20.4 21H14.6C14.2686 21 14 20.7314 14 20.4Z"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
      ></path>
      <path
        d="M3 20.4V14.6C3 14.2686 3.26863 14 3.6 14H9.4C9.73137 14 10 14.2686 10 14.6V20.4C10 20.7314 9.73137 21 9.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
      ></path>
      <path
        d="M14 9.4V3.6C14 3.26863 14.2686 3 14.6 3H20.4C20.7314 3 21 3.26863 21 3.6V9.4C21 9.73137 20.7314 10 20.4 10H14.6C14.2686 10 14 9.73137 14 9.4Z"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
      ></path>
      <path
        d="M3 9.4V3.6C3 3.26863 3.26863 3 3.6 3H9.4C9.73137 3 10 3.26863 10 3.6V9.4C10 9.73137 9.73137 10 9.4 10H3.6C3.26863 10 3 9.73137 3 9.4Z"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
      ></path>
    </svg>
  );
};

export const CarouselIcon = ({ ...props }: IconProps) => {
  return (
    <svg
      width="36px"
      height="36px"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={props.color ?? "#141414"}
      {...props}
    >
      <path
        d="M12 21V7C12 5.89543 12.8954 5 14 5H21.4C21.7314 5 22 5.26863 22 5.6V18.7143"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M12 21V7C12 5.89543 11.1046 5 10 5H2.6C2.26863 5 2 5.26863 2 5.6V18.7143"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M14 19L22 19"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M10 19L2 19"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M12 21C12 19.8954 12.8954 19 14 19"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 21C12 19.8954 11.1046 19 10 19"
        stroke={props.color ?? "#141414"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
