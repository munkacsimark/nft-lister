import { FunctionComponent, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
};

const Button: FunctionComponent<
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ variant = "primary", children, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${styles.button} ${styles[variant]}${
        className ? " " + className : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
