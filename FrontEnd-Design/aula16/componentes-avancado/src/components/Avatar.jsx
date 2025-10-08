const Avatar = ({ 
  src = null,
  alt = 'Avatar',
  size = 'md',
  status = null,
  initials = '',
  variant = 'circle',
  className = '',
  ...props 
}) => {
  
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl'
  }
  
  const variants = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    rounded: 'rounded-md'
  }
  
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500'
  }
  
  const avatarClasses = `
    relative inline-flex items-center justify-center font-medium text-white bg-gray-500 overflow-hidden
    ${sizes[size]}
    ${variants[variant]}
    ${className}
  `.trim()

  return (
    <div className={avatarClasses} {...props}>
      {src ? (
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-semibold bg-gradient-to-br from-blue-400 to-purple-500 w-full h-full flex items-center justify-center">
          {initials || alt.charAt(0).toUpperCase()}
        </span>
      )}
      
      {status && (
        <span 
          className={`
            absolute bottom-0 right-0 block rounded-full ring-2 ring-white
            ${size === 'xs' ? 'w-2 h-2' : size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'}
            ${statusColors[status]}
          `}
        />
      )}
    </div>
  )
}

export default Avatar