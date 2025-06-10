"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

// 多语言文本配置
const translations = {
  zh: {
    title: "UI画布尺寸计算器",
    subtitle: "面对陌生的设备，帮你解决\"画布该设成多大\"的问题。",
    description: "根据屏幕信息计算UI设计画布尺寸",
    formTitle: "输入参数",
    formDescription: "请填写屏幕信息和您的设计偏好。",
    screenWidthLabel: "屏幕像素宽度",
    screenHeightLabel: "屏幕像素高度",
    screenSizeLabel: "屏幕尺寸（英寸）",
    screenSizeDescription: "屏幕对角线长度，单位为英寸。",
    usageDistanceLabel: "使用距离",
    designWidthLabel: "习惯的设计稿宽度",
    designWidthDescription: "您通常在哪种倍数的画布上设计App界面。",
    screenPPILabel: "屏幕PPI",
    screenMultiplierLabel: "屏幕倍数",
    calculatedHeightLabel: "画布高度",
    canvasWidthLabel: "画布宽度",
    assetExportLabel: "切图倍数",
    fontSizeLabel: "小字建议字号",
    timesUnit: "倍",
    usageDistances: {
      close: "近距离/触屏",
      medium: "中距离/键鼠",
      far: "远距离/遥控"
    },
    calculate: "计算画布尺寸",
    result: "计算结果",
    resultDescription: "根据您的输入，建议的设计参数如下：",
    disclaimer: "计算结果基于统计，反映大多数屏幕情况，仅供参考。查看",
    detailProcess: "详细计算过程",
    themeToggle: {
      light: "浅色模式",
      dark: "深色模式"
    }
  },
  en: {
    title: "UI Canvas Size Calculator",
    subtitle: "Facing unfamiliar devices? Let us help you solve the \"canvas size\" problem.",
    description: "Calculate UI design canvas size based on screen information",
    formTitle: "Input Parameters",
    formDescription: "Please fill in screen information and your design preferences.",
    screenWidthLabel: "Screen Pixel Width",
    screenHeightLabel: "Screen Pixel Height",
    screenSizeLabel: "Screen Size (inches)",
    screenSizeDescription: "Screen diagonal length in inches.",
    usageDistanceLabel: "Usage Distance",
    designWidthLabel: "Preferred Design Width",
    designWidthDescription: "The canvas size you usually design App interfaces on.",
    screenPPILabel: "Screen PPI",
    screenMultiplierLabel: "Screen Multiplier",
    calculatedHeightLabel: "Canvas Height",
    canvasWidthLabel: "Canvas Width",
    assetExportLabel: "Asset Export Scale",
    fontSizeLabel: "Small Font Size",
    timesUnit: "x",
    usageDistances: {
      close: "Close/Touch",
      medium: "Medium/Mouse",
      far: "Far/Remote"
    },
    calculate: "Calculate Canvas Size",
    result: "Calculation Result",
    resultDescription: "Based on your input, here are the recommended design parameters:",
    disclaimer: "Results are statistical estimates for reference only. View",
    detailProcess: "detailed calculation process",
    themeToggle: {
      light: "Light Mode",
      dark: "Dark Mode"
    }
  }
}

type Language = "zh" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null
    if (saved && (saved === "zh" || saved === "en")) {
      setLanguage(saved)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string) => {
    const keys = key.split(".")
    let value: unknown = translations[language]
    
    for (const k of keys) {
      value = value && typeof value === 'object' ? (value as Record<string, unknown>)[k] : undefined
    }
    
    return (typeof value === 'string' ? value : key)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
} 