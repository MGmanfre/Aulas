import { useState } from 'react'

const Input = ({ 
  label = '',
  placeholder = '',
  type = 'text',
  error = '',
  success = false,
  disabled = false,
  icon = null,
  helper = '',
  required = false,
  className = '',
  ...props 
}) => {
  const [setFocused] = useState(false)
  
  const getInputClasses = () => {
    let classes = 'w-full px-3 py-2 border rounded-md transition-all duration-200 focus:outline-none '
    
    if (error) {
      classes += 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 '
    } else if (success) {
      classes += 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 '
    } else {
      classes += 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 '
    }
    
    if (disabled) {
      classes += 'bg-gray-100 cursor-not-allowed opacity-60 '
    }
    
    if (icon) {
      classes += 'pl-10 '
    }
    
    return classes + className
  }

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">
              {icon}
            </div>
          </div>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={getInputClasses()}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          {error}
        </p>
      )}
      
      {success && !error && (
        <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          Perfeito!
        </p>
      )}
      
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500">{helper}</p>
      )}
    </div>
  )
}

export default Input