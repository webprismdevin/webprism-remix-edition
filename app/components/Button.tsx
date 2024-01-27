import { Link } from "@remix-run/react";
import { ReactNode } from "react";
import cn from "~/lib/cn";

type ButtonProps = {
  as: "button" | "a";
  to?: string;
  children: ReactNode;
  props: any;
  className?: string;
} & any;

export const Button = ({ as, children, className, ...props }: ButtonProps) => {
  const TagName = as;

  if (props.to) {
    return (
      <Link
        to={props.to}
        className={cn(
          "bg-black text-white px-4 py-2 rounded-full drop-shadow-sm",
          className
        )}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <TagName
      {...props}
      className={cn(
        "bg-black text-white px-4 py-2 rounded-full drop-shadow-sm",
        className
      )}
    >
      {children}
    </TagName>
  );
};
