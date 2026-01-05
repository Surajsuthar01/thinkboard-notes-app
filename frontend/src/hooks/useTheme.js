import { useEffect, useState } from "react";

const useTheme = () => {
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    return saved ? saved : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
