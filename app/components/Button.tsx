import { Link } from "@remix-run/react";

export type ButtonProps = {
  children: React.ReactNode;
  url: string;
  variant: "hero";
  colorTheme: any;
};

export const Button = ({ children, url, variant, colorTheme }: ButtonProps) => {
  const variants = {
    hero: "my-[2.5rem]",
  };

  return (
    <Link
      to={url}
      className={`mx-auto md:mx-0 rounded-full border p-5 font-heading text-cta ${variants[variant]} flex flex-col justify-end`}
      style={{
        color: colorTheme?.background?.hex,
        background: colorTheme?.text?.hex,
        boxShadow: `2px 5px 0px 0px ${colorTheme?.accent?.hex}`,
        borderColor: colorTheme?.text?.hex,
      }}
    >
      {children}
    </Link>
  );
};
