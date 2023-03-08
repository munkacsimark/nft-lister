import { FunctionComponent, HTMLAttributes, useEffect, useState } from "react";
import Button from "../button/Button";

type Theme = "dark" | "light";

const getSystemTheme = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";

const ThemeSwitcher: FunctionComponent<HTMLAttributes<HTMLButtonElement>> = ({
  ...rest
}) => {
  const [theme, setTheme] = useState<Theme>(getSystemTheme());

  useEffect(() => {
    document
      .querySelector("html")
      ?.setAttribute("data-theme", getSystemTheme());
  }, []);

  const handleSwitch = () => {
    document
      .querySelector("html")
      ?.setAttribute("data-theme", theme === "dark" ? "light" : "dark");
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <Button variant="secondary" {...rest} onClick={handleSwitch}>
      {theme === "dark" ? "🌞" : "🌜"}
    </Button>
  );
};

export default ThemeSwitcher;
