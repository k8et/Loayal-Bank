import React, { createContext, useState, ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

type Theme = "light" | "dark";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const themeContextValue: ThemeContextType = {
        theme,
        toggleTheme,
    };

    // создаем тему для Material UI
    const muiTheme = createTheme({
        palette: {
            mode: theme, // используем текущую тему из нашего контекста
        },
    });

    return (
        <ThemeContext.Provider value={themeContextValue}>
            <MuiThemeProvider theme={muiTheme}> {/* Оборачиваем наше приложение в MuiThemeProvider */}
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
