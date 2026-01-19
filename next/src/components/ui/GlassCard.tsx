import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-white/5 backdrop-blur-2xl
        rounded-2xl border border-white/10
        shadow-glass
        ${hover ? 'hover:bg-white/[0.07] hover:border-white/20 hover:shadow-2xl' : ''}
        transition-all duration-300
        ${className}
      `}
    >
      {/* Glass shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
