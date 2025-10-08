export const designTokens = {
  colors: {
    primary: {
      50: 'bg-blue-50',
      100: 'bg-blue-100',
      500: 'bg-blue-500',
      600: 'bg-blue-600',
      700: 'bg-blue-700',
      900: 'bg-blue-900'
    },
    secondary: {
      50: 'bg-purple-50',
      500: 'bg-purple-500',
      600: 'bg-purple-600'
    },
    success: {
      50: 'bg-green-50',
      500: 'bg-green-500',
      600: 'bg-green-600'
    },
    danger: {
      50: 'bg-red-50',
      500: 'bg-red-500',
      600: 'bg-red-600'
    }
  },
  spacing: {
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  },
  borderRadius: {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  }
}

// utilitário pra extrair classe pelo prefixo
export const getTokenClasses = (token, type) => {
  if (!token) return ''
  // se o token já tiver o prefixo (bg-, text-, border-), mantém
  if (token.startsWith(type)) return token
  // senão adiciona prefixo
  return `${type}-${token}`
}