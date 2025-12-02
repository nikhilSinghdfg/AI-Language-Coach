"use client";

import { createContext, useContext, useState, useEffect, useEffectEvent } from "react";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(false) //true=dark mode false=light mode
    const [fontSize, setFontSize] = useState("medium")


    const toggleTheme = () => {
        setTheme((prev) => !prev);
    };

    useEffect(() => {
        const saved = localStorage.getItem("theme")
        if (saved !== null) {
            setTheme(saved === 'true')
        }
    }, [])


    useEffect(() => {
        const fontsize = localStorage.getItem("fontSize")
        setFontSize(fontsize)
    }, [])


    useEffect(() => {
        localStorage.setItem("theme", theme.toString())
    }, [theme])

    useEffect(() => {
        localStorage.setItem("fontSize", fontSize)
    }, [fontSize])



    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, fontSize, setFontSize }}>

            <div children={
                fontSize === 'small' ? "text-sm" :
                    fontSize === 'medium' ? "text-bg" : "text-lg"
            }>
                {children}
            </div>
        </ThemeContext.Provider >
    )


}

export const useThemeContext = () => useContext(ThemeContext)