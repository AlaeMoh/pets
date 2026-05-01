import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../locales/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  const t = (key) => translations[lang][key] || key;

useEffect(() => {
  localStorage.setItem("lang", lang);
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);