"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Language } from "@/types";
import { getTranslations, type TranslationKey } from "./translations";

interface I18nContextValue {
  lang: Language;
  t: TranslationKey;
  setLang: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
    }
  }, []);

  return (
    <I18nContext.Provider value={{ lang, t: getTranslations(lang), setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
