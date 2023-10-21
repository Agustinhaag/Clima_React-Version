import { useState, createContext, useContext } from "react";

export const ThemeContext = createContext();

export const TemaProvider = ({ children }) => {
  const [contextTheme, setContextTheme] = useState("Dark");
  const values = { contextTheme, setContextTheme };
  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
};

export const useTemaContext = () => {
  const context = useContext(ThemeContext);
  return context;
};
