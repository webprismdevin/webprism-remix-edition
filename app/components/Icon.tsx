import React from "react";

type IconProps = {
  className?: string;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

export function NavArrowDown({ className, ...props }: IconProps) {
  return (
    <svg
      className={className}
      width="36px"
      height="36px"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={props.color}
      {...props}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="#5198da"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
