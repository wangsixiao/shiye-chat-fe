import React, { createContext, useContext, useEffect, useState } from 'react'
import { subscribeResponsive } from '@/utils'

type ResponsiveContextValue = {
  isMobile: boolean
  width: number
}

const ResponsiveContext = createContext<ResponsiveContextValue>({
  isMobile: true,
  width: 375,
})

export function ResponsiveProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<ResponsiveContextValue>(() => {
    if (typeof window === 'undefined') return { isMobile: true, width: 375 }
    const w = window.innerWidth ?? document.documentElement.clientWidth
    return { isMobile: w <= 600, width: w }
  })

  useEffect(() => {
    return subscribeResponsive((isMobile, width) => {
      setValue({ isMobile, width })
    })
  }, [])

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  )
}

export function useResponsive(): ResponsiveContextValue {
  const ctx = useContext(ResponsiveContext)
  if (!ctx) {
    throw new Error('useResponsive must be used within ResponsiveProvider')
  }
  return ctx
}
