import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'kovil_frontend_lang';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ta' || saved === 'en') {
        return saved;
      }
    } catch {
      // ignore storage access errors
    }
    return 'ta';
  });

  const setLanguage = useCallback((lang) => {
    const validLang = lang === 'en' ? 'en' : 'ta';
    setLanguageState(validLang);
    try {
      localStorage.setItem(STORAGE_KEY, validLang);
    } catch {
      // ignore
    }
    document.documentElement.lang = validLang;
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'ta' ? 'en' : 'ta');
  }, [language, setLanguage]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback((key, params = {}) => {
    const langDict = translations[language] || translations.ta;
    let text = langDict[key] ?? translations.ta[key] ?? key;

    if (params && typeof params === 'object') {
      Object.entries(params).forEach(([paramKey, val]) => {
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(val));
      });
    }

    return text;
  }, [language]);

  // Helper to choose between Tamil or English values
  const tText = useCallback((taVal, enVal) => {
    if (language === 'en') {
      return enVal || taVal || '';
    }
    return taVal || enVal || '';
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage,
    isTamil: language === 'ta',
    isEnglish: language === 'en',
    t,
    tText
  }), [language, setLanguage, toggleLanguage, t, tText]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
