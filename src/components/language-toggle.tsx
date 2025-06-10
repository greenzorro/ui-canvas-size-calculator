"use client"

import * as React from "react"
import { useLanguage } from "@/components/providers/language-provider"

import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh")
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleLanguage}>
      {language === "zh" ? (
        <span className="text-xs font-medium">EN</span>
      ) : (
        <span className="text-xs font-medium">中</span>
      )}
      <span className="sr-only">切换语言 / Toggle language</span>
    </Button>
  )
} 