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
        stroke="#5198da"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H11"
        stroke="#5198da"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
    </svg>
  );
}
