"use client";

import { Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";

export function Header() {
  const { lang, setLang } = useI18n();

  const toggleLang = () => {
    setLang(lang === "en" ? "ms" : "en");
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-950">
      <div />
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={toggleLang}>
          <Globe className="h-4 w-4" />
          {lang === "en" ? "Bahasa Melayu" : "English"}
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
          AR
        </div>
      </div>
    </header>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
  );
}
