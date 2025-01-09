"use client"

import React, { useState, useEffect, useRef } from 'react'
import { cn } from "@/lib/utils.ts"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  speed?: number
  pauseOnHover?: boolean
}

export function Marquee({ 
  children, 
  speed = 50, 
  pauseOnHover = true, 
  className, 
  ...props 
}: MarqueeProps) {
  const [contentWidth, setContentWidth] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth)
    }
  }, [children])

  return (
    <div 
      className={cn(
        "overflow-hidden bg-black text-white whitespace-nowrap",
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      {...props}
    >
      <div
        className="inline-block animate-marquee"
        style={{
          animationDuration: `${contentWidth / speed}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        <div ref={contentRef} className="inline-block">
          {children}
        </div>
        <div className="inline-block">
          {children}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  )
}

