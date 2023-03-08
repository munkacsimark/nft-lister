import { FunctionComponent, InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

const Input: FunctionComponent<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...rest
}) => {
  return (
    <input
      {...rest}
      className={`${styles.input}${className ? " " + className : ""}`}
    />
  );
};

export default Input;
