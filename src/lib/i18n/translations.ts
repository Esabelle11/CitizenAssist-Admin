import type { Language } from "@/types";

import en from "./en";
import ms from "./ms";

export const translations = {
  en,
  ms,
};

type DeepString<T> = {
  [K in keyof T]: T[K] extends object
    ? DeepString<T[K]>
    : string;
};

export type TranslationKey = DeepString<typeof en>;

export function getTranslations(lang: Language): TranslationKey {
  return translations[lang] as TranslationKey;
}