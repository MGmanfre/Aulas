import { designTokens, getTokenClasses } from '../design-tokens'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  icon = null,
  onClick,
  className = '',
  ...props 
}) => {
  
  // Usando design tokens para cores
  const colorVariants = {
    primary: `${getTokenClasses(designTokens.colors.primary[500], 'bg')} 
              hover:${getTokenClasses(designTokens.colors.primary[600], 'bg')} 
              text-white ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    
    secondary: `${getTokenClasses(designTokens.colors.secondary[500], 'bg')} 
                hover:${getTokenClasses(designTokens.colors.secondary[600], 'bg')} 
                text-white ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    
    success: `${getTokenClasses(designTokens.colors.success[500], 'bg')} 
              hover:${getTokenClasses(designTokens.colors.success[600], 'bg')} 
              text-white ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    
    danger: `${getTokenClasses(designTokens.colors.danger[500], 'bg')} 
             hover:${getTokenClasses(designTokens.colors.danger[600], 'bg')} 
             text-white ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    
    outline: `border-2 ${getTokenClasses(designTokens.colors.primary[500], 'border')} 
              ${getTokenClasses(designTokens.colors.primary[500], 'text')} 
              hover:${getTokenClasses(designTokens.colors.primary[500], 'bg')} 
              hover:text-white ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    
    ghost: `${getTokenClasses(designTokens.colors.primary[500], 'text')} 
            hover:${getTokenClasses(designTokens.colors.primary[50], 'bg')} 
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
  }
  
  // Variações de tamanho usando tokens de spacing
  const sizeVariants = {
    xs: `px-2 py-1 text-xs ${designTokens.borderRadius.sm}`,
    sm: `px-3 py-1.5 text-sm ${designTokens.borderRadius.md}`,
    md: `px-4 py-2 text-base ${designTokens.borderRadius.md}`,
    lg: `px-6 py-3 text-lg ${designTokens.borderRadius.lg}`,
    xl: `px-8 py-4 text-xl ${designTokens.borderRadius.lg}`
  }
  
  const baseClasses = `font-semibold transition-all duration-200 focus:outline-none 
                      focus:ring-2 focus:ring-blue-300 inline-flex items-center justify-center gap-2`
  
  const buttonClasses = `
    ${baseClasses}
    ${colorVariants[variant]}
    ${sizeVariants[size]}
    ${loading ? 'pointer-events-none' : ''}
    ${className}
  `.trim()

  return (
    <button 
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !loading && icon}
      {children}
    </button>
  )
}

export default Button