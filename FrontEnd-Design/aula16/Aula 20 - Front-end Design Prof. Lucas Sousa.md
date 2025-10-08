# Aula 20 - Componentes Avançados com Tailwind + React

## 🎯 Objetivos da Aula

- Criar componentes reutilizáveis e escaláveis com Tailwind + React
- Implementar sistema de variants para componentes
- Trabalhar com props dinâmicas e composição
- Construir uma biblioteca básica de componentes
- Aplicar padrões de design consistentes

---

## Passo 1: Configurar o Projeto React com Vite + Tailwind

Primeiro, crie um novo projeto React usando o Vite:

```bash
npm create vite@latest componentes-avancados
cd componentes-avancados
npm install
npm install tailwindcss @tailwindcss/vite
```

Configure os Arquivos do Tailwind. Edite `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

No `src/index.css` (ou `App.css`):

```css
@import "tailwindcss";
```

## Passo 2: Sistema de Design Tokens

Antes de criar componentes, vamos estabelecer nossos tokens de design. Crie `src/design-tokens.js`:

```js
// src/design-tokens.js
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
```

## Passo 3: Button Component com Variants

Crie um sistema de botões flexível em `src/components/Button.jsx`:

```jsx
// src/components/Button.jsx
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
```

## Passo 4: Card Component Flexível

Crie um componente Card versátil em `src/components/Card.jsx`:

```jsx
// src/components/Card.jsx
const Card = ({ 
  children, 
  variant = 'default',
  hover = false,
  className = '',
  header = null,
  footer = null,
  ...props 
}) => {
  
  const variants = {
    default: 'bg-white shadow-md',
    elevated: 'bg-white shadow-lg',
    bordered: 'bg-white border border-gray-200',
    ghost: 'bg-transparent',
    gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100'
  }
  
  const hoverEffect = hover ? 'hover:shadow-xl hover:scale-105 cursor-pointer' : ''
  
  const cardClasses = `
    rounded-lg transition-all duration-300 overflow-hidden
    ${variants[variant]}
    ${hoverEffect}
    ${className}
  `.trim()

  return (
    <div className={cardClasses} {...props}>
      {header && (
        <div className="px-6 py-4 border-b border-gray-100">
          {header}
        </div>
      )}
      
      <div className="p-6">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card
```

## Passo 5: Input Component com Estados

Crie um sistema de inputs em `src/components/Input.jsx`:

```jsx
// src/components/Input.jsx
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
```

## Passo 6: Badge Component

Crie badges informativos em `src/components/Badge.jsx`:

```jsx
// src/components/Badge.jsx
const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  removable = false,
  onRemove = null,
  className = '',
  ...props 
}) => {
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-cyan-100 text-cyan-800'
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }
  
  const badgeClasses = `
    inline-flex items-center gap-1 rounded-full font-medium
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim()

  return (
    <span className={badgeClasses} {...props}>
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      )}
    </span>
  )
}

export default Badge
```

## Passo 7: Modal Component

Crie um modal reutilizável em `src/components/Modal.jsx`:

```jsx
// src/components/Modal.jsx
import { useEffect } from 'react'

const Modal = ({ 
  isOpen = false,
  onClose = () => {},
  title = '',
  children,
  size = 'md',
  showCloseButton = true,
  className = '',
  ...props 
}) => {
  
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full mx-4'
  }
  
  // Fechar modal com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className={`
          bg-white rounded-xl shadow-2xl w-full transform transition-all duration-200
          ${sizes[size]}
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            )}
          </div>
        )}
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
```

## Passo 8: Avatar Component

Crie um componente de avatar em `src/components/Avatar.jsx`:

```jsx
// src/components/Avatar.jsx
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
```

## Passo 9: Showcase dos Componentes

Agora vamos criar uma página para mostrar todos os componentes. Atualize `src/App.jsx`:

```jsx
// src/App.jsx
import { useState } from 'react'
import Button from './components/Button'
import Card from './components/Card'
import Input from './components/Input'
import Badge from './components/Badge'
import Modal from './components/Modal'
import Avatar from './components/Avatar'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (!inputValue) {
        setInputError('Este campo é obrigatório')
      } else {
        setInputError('')
        alert('Formulário enviado com sucesso!')
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Biblioteca de Componentes
          </h1>
          <p className="text-lg text-gray-600">
            Componentes reutilizáveis construídos com Tailwind CSS + React
          </p>
        </div>

        {/* Buttons Section */}
        <Card 
          header={<h2 className="text-2xl font-semibold">Buttons</h2>}
          className="w-full"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">States</h3>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button loading={loading} onClick={handleSubmit}>
                  {loading ? 'Loading...' : 'Click me'}
                </Button>
                <Button 
                  icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>}
                >
                  With Icon
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Cards Section */}
        <Card 
          header={<h2 className="text-2xl font-semibold">Cards</h2>}
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default">
              <h3 className="font-semibold mb-2">Default Card</h3>
              <p className="text-gray-600">Card básico com sombra sutil.</p>
            </Card>
            
            <Card variant="elevated" hover>
              <h3 className="font-semibold mb-2">Elevated Card</h3>
              <p className="text-gray-600">Card com sombra maior e hover effect.</p>
            </Card>
            
            <Card 
              variant="gradient"
              header={
                <div className="flex items-center gap-3">
                  <Avatar initials="JD" size="sm" />
                  <span className="font-medium">John Doe</span>
                </div>
              }
              footer={
                <div className="flex gap-2">
                  <Badge variant="primary">React</Badge>
                  <Badge variant="success">Tailwind</Badge>
                </div>
              }
            >
              <p className="text-gray-600">Card com header, footer e gradient.</p>
            </Card>
          </div>
        </Card>

        {/* Inputs Section */}
        <Card 
          header={<h2 className="text-2xl font-semibold">Inputs</h2>}
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Nome completo"
              placeholder="Digite seu nome"
              required
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              error={inputError}
            />
            
            <Input 
              label="Email"
              type="email"
              placeholder="seu@email.com"
              success={inputValue && !inputError}
              icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>}
            />
            
            <Input 
              label="Senha"
              type="password"
              placeholder="••••••••"
              helper="Mínimo 8 caracteres"
            />
            
            <Input 
              label="Campo desabilitado"
              placeholder="Não editável"
              disabled
              value="Valor fixo"
            />
          </div>
        </Card>

        {/* Badges and Avatars */}
        <Card 
          header={<h2 className="text-2xl font-semibold">Badges & Avatars</h2>}
          className="w-full"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info" removable onRemove={() => alert('Badge removida!')}>
                  Removable
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Avatars</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Avatar initials="AB" size="xs" />
                <Avatar initials="CD" size="sm" status="online" />
                <Avatar 
                  src="https://picsum.photos/100/100?random=1" 
                  size="md" 
                  status="busy" 
                />
                <Avatar initials="EF" size="lg" variant="square" status="away" />
                <Avatar 
                  src="https://picsum.photos/100/100?random=2" 
                  size="xl" 
                  variant="rounded" 
                />
                <Avatar initials="GH" size="2xl" status="offline" />
              </div>
            </div>
          </div>
        </Card>

        {/* Modal Section */}
        <Card 
          header={<h2 className="text-2xl font-semibold">Modal</h2>}
          className="w-full"
        >
          <div className="space-y-4">
            <Button onClick={() => setIsModalOpen(true)}>
              Abrir Modal
            </Button>
            
            <Modal 
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Exemplo de Modal"
              size="lg"
            >
              <div className="space-y-4">
                <p className="text-gray-600">
                  Este é um exemplo de modal responsivo e acessível construído com React e Tailwind CSS.
                </p>
                
                <Input 
                  label="Campo dentro do modal"
                  placeholder="Digite algo..."
                />
                
                <div className="flex gap-3 pt-4">
                  <Button onClick={() => setIsModalOpen(false)}>
                    Confirmar
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </Card>

      </div>
    </div>
  )
}

export default App
```

## Mini Projeto: Dashboard Card

Crie um componente de dashboard combinando vários componentes:

```jsx
// src/components/DashboardCard.jsx
import Card from './Card'
import Avatar from './Avatar'
import Badge from './Badge'
import Button from './Button'

const DashboardCard = ({ user, stats, actions }) => {
  return (
    <Card 
      variant="elevated" 
      hover
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar 
              src={user.avatar} 
              initials={user.initials}
              status={user.status}
              size="lg"
            />
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
          </div>
          <Badge variant={user.active ? 'success' : 'danger'}>
            {user.active ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>
      }
      footer={
        <div className="flex gap-2">
          {actions.map((action, index) => (
            <Button 
              key={index}
              variant={action.variant}
              size="sm"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-4 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default DashboardCard
```

### Importa no topo do `App.jsx`

```jsx
import DashboardCard from './components/DashboardCard'
```

### Adiciona uma nova seção antes do fechamento do container principal

(por exemplo, logo antes do `</div>` final do `App`):

```jsx
{/* Dashboard Card Section */}
<Card 
  header={<h2 className="text-2xl font-semibold">Dashboard Card</h2>}
  className="w-full"
>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <DashboardCard 
      user={{
        name: "Lucas Sousa",
        role: "Professor",
        avatar: "https://picsum.photos/100?random=3",
        initials: "LS",
        status: "online",
        active: true
      }}
      stats={[
        { label: "Projetos", value: 12 },
        { label: "Alunos", value: 250 },
        { label: "Cursos", value: 5 }
      ]}
      actions={[
        { label: "Editar", variant: "primary", onClick: () => alert("Editar usuário") },
        { label: "Excluir", variant: "danger", onClick: () => alert("Excluir usuário") }
      ]}
    />

    <DashboardCard 
      user={{
        name: "Maria Silva",
        role: "Engenheira de Software",
        avatar: "https://picsum.photos/100?random=4",
        initials: "MS",
        status: "away",
        active: false
      }}
      stats={[
        { label: "Commits", value: 532 },
        { label: "Pull Requests", value: 48 },
        { label: "Issues", value: 19 }
      ]}
      actions={[
        { label: "Ativar", variant: "success", onClick: () => alert("Usuário ativado!") },
        { label: "Detalhes", variant: "outline", onClick: () => alert("Abrir detalhes") }
      ]}
    />
  </div>
</Card>
```

## Atividades em Sala 💪

1. **Criar um componente de Notification Toast** com diferentes tipos (success, error, warning, info)
2. **Implementar um componente de Progress Bar** com animação
3. **Construir um componente de Tabs** reutilizável
4. **Criar um sistema de Rating (estrelas)** interativo
5. **Desafio:** Montar um **formulário complexo** que use todos os componentes criados

### Estrutura Final do Projeto

```bash
src/
├── components/
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Input.jsx
│   ├── Badge.jsx
│   ├── Modal.jsx
│   ├── Avatar.jsx
│   └── DashboardCard.jsx
├── design-tokens.js
└── App.jsx
```

## Extras

## Passo 10: Componente de Notification Toast

Crie um sistema de notificações em `src/components/Toast.jsx`:

```jsx
// src/components/Toast.jsx
import { useState, useEffect } from 'react'

const Toast = ({ 
  type = 'info',
  title = '',
  message = '',
  duration = 5000,
  onClose = () => {},
  isVisible = true
}) => {
  const [show, setShow] = useState(isVisible)
  
  const types = {
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: 'text-green-400',
      text: 'text-green-800',
      iconPath: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: 'text-red-400',
      text: 'text-red-800',
      iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      icon: 'text-yellow-400',
      text: 'text-yellow-800',
      iconPath: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-400',
      text: 'text-blue-800',
      iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'
    }
  }
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setShow(false)
        setTimeout(onClose, 300) // Aguarda animação
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])
  
  const currentType = types[type]
  
  return (
    <div className={`
      fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out
      ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `}>
      <div className={`
        max-w-sm w-full border rounded-lg p-4 shadow-lg
        ${currentType.bg}
      `}>
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 ${currentType.icon}`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d={currentType.iconPath} />
            </svg>
          </div>
          
          <div className="flex-1">
            {title && (
              <h4 className={`font-medium ${currentType.text}`}>
                {title}
              </h4>
            )}
            <p className={`text-sm ${currentType.text} ${title ? 'mt-1' : ''}`}>
              {message}
            </p>
          </div>
          
          <button
            onClick={() => {
              setShow(false)
              setTimeout(onClose, 300)
            }}
            className={`flex-shrink-0 ${currentType.icon} hover:opacity-70`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toast
```

## Passo 11: Progress Bar Component

Crie uma barra de progresso em `src/components/ProgressBar.jsx`:

```jsx
// src/components/ProgressBar.jsx
import { useEffect, useState } from 'react'

const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'primary',
  animated = false,
  showLabel = false,
  label = '',
  className = ''
}) => {
  const [currentValue, setCurrentValue] = useState(0)
  
  const sizes = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  }
  
  const variants = {
    primary: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  }
  
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentValue(percentage)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [percentage])
  
  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {label}
          </span>
          {showLabel && (
            <span className="text-sm font-medium text-gray-700">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className={`
        bg-gray-200 rounded-full overflow-hidden
        ${sizes[size]}
      `}>
        <div
          className={`
            h-full rounded-full transition-all duration-500 ease-out
            ${variants[variant]}
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${currentValue}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
```

## Passo 12: Tabs Component

Crie um sistema de abas em `src/components/Tabs.jsx`:

```jsx
// src/components/Tabs.jsx
import { useState } from 'react'

const Tabs = ({ 
  tabs = [],
  defaultTab = 0,
  variant = 'default',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab)
  
  const variants = {
    default: {
      container: 'border-b border-gray-200',
      tab: 'py-2 px-4 text-sm font-medium border-b-2 transition-colors',
      active: 'text-blue-600 border-blue-600',
      inactive: 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
    },
    pills: {
      container: 'bg-gray-100 p-1 rounded-lg',
      tab: 'py-2 px-4 text-sm font-medium rounded-md transition-all',
      active: 'bg-white text-gray-900 shadow-sm',
      inactive: 'text-gray-600 hover:text-gray-900'
    }
  }
  
  const currentVariant = variants[variant]
  
  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className={`flex space-x-1 ${currentVariant.container}`}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`
              ${currentVariant.tab}
              ${activeTab === index 
                ? currentVariant.active 
                : currentVariant.inactive
              }
            `}
          >
            {tab.icon && (
              <span className="mr-2">{tab.icon}</span>
            )}
            {tab.label}
            {tab.badge && (
              <span className="ml-2 bg-gray-200 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="mt-6">
        {tabs[activeTab]?.content}
      </div>
    </div>
  )
}

export default Tabs
```

## Passo 13: Rating Component

Crie um sistema de avaliação por estrelas em `src/components/Rating.jsx`:

```jsx
// src/components/Rating.jsx
import { useState } from 'react'

const Rating = ({
  value = 0,
  maxRating = 5,
  size = 'md',
  readonly = false,
  onChange = () => {},
  showLabel = false,
  className = ''
}) => {
  const [hoverRating, setHoverRating] = useState(0)
  const [currentRating, setCurrentRating] = useState(value)
  
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }
  
  const handleClick = (rating) => {
    if (!readonly) {
      setCurrentRating(rating)
      onChange(rating)
    }
  }
  
  const handleMouseEnter = (rating) => {
    if (!readonly) {
      setHoverRating(rating)
    }
  }
  
  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0)
    }
  }
  
  const getStarColor = (index) => {
    const rating = hoverRating || currentRating
    return index <= rating ? 'text-yellow-400' : 'text-gray-300'
  }
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1
          return (
            <button
              key={index}
              type="button"
              disabled={readonly}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              className={`
                transition-colors duration-150
                ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
                ${getStarColor(starValue)}
                ${sizes[size]}
              `}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-full h-full"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </button>
          )
        })}
      </div>
      
      {showLabel && (
        <span className="text-sm text-gray-600 ml-2">
          {currentRating} de {maxRating}
        </span>
      )}
    </div>
  )
}

export default Rating
```

## Passo 14: Formulário Complexo - Exemplo de Uso

Agora vamos criar um formulário que integra todos os componentes. Atualize o `App.jsx`:

```jsx
// Adicione estas importações no App.jsx
import Toast from './components/Toast'
import ProgressBar from './components/ProgressBar'
import Tabs from './components/Tabs'
import Rating from './components/Rating'

// Adicione estes estados no App.jsx
const [toasts, setToasts] = useState([])
const [progress, setProgress] = useState(0)
const [rating, setRating] = useState(0)

// Adicione estas funções
const addToast = (type, title, message) => {
  const id = Date.now()
  const newToast = { id, type, title, message }
  setToasts(prev => [...prev, newToast])
}

const removeToast = (id) => {
  setToasts(prev => prev.filter(toast => toast.id !== id))
}

const simulateProgress = () => {
  setProgress(0)
  const interval = setInterval(() => {
    setProgress(prev => {
      if (prev >= 100) {
        clearInterval(interval)
        addToast('success', 'Concluído!', 'Processo finalizado com sucesso.')
        return 100
      }
      return prev + 10
    })
  }, 200)
}

// Adicione estas seções antes do fechamento da div principal:

{/* Toasts & Progress */}
<Card 
  header={<h2 className="text-2xl font-semibold">Toasts & Progress</h2>}
  className="w-full"
>
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-3">Toast Notifications</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          size="sm" 
          variant="success"
          onClick={() => addToast('success', 'Sucesso!', 'Operação realizada com sucesso.')}
        >
          Success Toast
        </Button>
        <Button 
          size="sm" 
          variant="danger"
          onClick={() => addToast('error', 'Erro!', 'Algo deu errado na operação.')}
        >
          Error Toast
        </Button>
        <Button 
          size="sm" 
          className="bg-yellow-500 hover:bg-yellow-600"
          onClick={() => addToast('warning', 'Atenção!', 'Verifique os dados inseridos.')}
        >
          Warning Toast
        </Button>
        <Button 
          size="sm" 
          className="bg-cyan-500 hover:bg-cyan-600"
          onClick={() => addToast('info', 'Informação', 'Dados atualizados recentemente.')}
        >
          Info Toast
        </Button>
      </div>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-3">Progress Bar</h3>
      <div className="space-y-4">
        <ProgressBar 
          value={progress} 
          label="Progresso atual"
          showLabel
          variant="primary"
        />
        <Button onClick={simulateProgress} disabled={progress > 0 && progress < 100}>
          Simular Progresso
        </Button>
      </div>
    </div>
  </div>
</Card>

{/* Tabs */}
<Card className="w-full">
  <Tabs
    tabs={[
      {
        label: 'Informações Gerais',
        icon: '📋',
        content: (
          <div className="space-y-4">
            <Input label="Nome da empresa" placeholder="Digite o nome..." />
            <Input label="CNPJ" placeholder="00.000.000/0000-00" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Telefone" placeholder="(11) 99999-9999" />
              <Input label="Email" type="email" placeholder="contato@empresa.com" />
            </div>
          </div>
        )
      },
      {
        label: 'Endereço',
        icon: '📍',
        badge: '2',
        content: (
          <div className="space-y-4">
            <Input label="CEP" placeholder="00000-000" />
            <Input label="Rua" placeholder="Nome da rua..." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Número" placeholder="123" />
              <Input label="Complemento" placeholder="Apto 45" />
              <Input label="Bairro" placeholder="Centro" />
            </div>
          </div>
        )
      },
      {
        label: 'Avaliação',
        icon: '⭐',
        content: (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Como você avalia nosso serviço?
              </label>
              <Rating 
                value={rating}
                onChange={setRating}
                size="lg"
                showLabel
              />
            </div>
            <Input 
              label="Comentários adicionais"
              placeholder="Deixe sua opinião..."
              helper="Opcional - nos ajude a melhorar"
            />
          </div>
        )
      }
    ]}
    variant="pills"
  />
</Card>

{/* Render Toasts */}
{toasts.map(toast => (
  <Toast
    key={toast.id}
    type={toast.type}
    title={toast.title}
    message={toast.message}
    onClose={() => removeToast(toast.id)}
  />
))}
```

## Passo 15: Hook Personalizado para Componentes

Crie um hook para gerenciar estados dos componentes em `src/hooks/useComponents.js`:

```js
// src/hooks/useComponents.js
import { useState, useCallback } from 'react'

export const useComponents = () => {
  const [toasts, setToasts] = useState([])
  const [modals, setModals] = useState({})
  
  const addToast = useCallback((type, title, message, duration = 5000) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, type, title, message, duration }])
  }, [])
  
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])
  
  const openModal = useCallback((modalId) => {
    setModals(prev => ({ ...prev, [modalId]: true }))
  }, [])
  
  const closeModal = useCallback((modalId) => {
    setModals(prev => ({ ...prev, [modalId]: false }))
  }, [])
  
  const isModalOpen = useCallback((modalId) => {
    return !!modals[modalId]
  }, [modals])
  
  return {
    toasts,
    addToast,
    removeToast,
    openModal,
    closeModal,
    isModalOpen
  }
}
```

### `App.jsx` pronto usando o `useComponents` pra controlar `Toast` e `Modal`, e já com a seção do `DashboardCard`.`

```jsx
// src/App.jsx
import { useState } from 'react'
import { useComponents } from './hooks/useComponents'

import Card from './components/Card'
import Button from './components/Button'
import Input from './components/Input'
import Modal from './components/Modal'
import Toast from './components/Toast'
import DashboardCard from './components/DashboardCard'

function App() {
  // hook centralizador
  const {
    toasts, addToast, removeToast,
    openModal, closeModal, isModalOpen
  } = useComponents()

  // só pra demo de input
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')

  const handleSubmit = () => {
    if (!inputValue) {
      setInputError('Este campo é obrigatório')
      addToast('error', 'Erro', 'Preencha o campo antes de enviar.')
      return
    }
    setInputError('')
    addToast('success', 'Sucesso', 'Formulário enviado com sucesso!')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Biblioteca de Componentes
          </h1>
          <p className="text-lg text-gray-600">
            Demo com DashboardCard + Toast + Modal usando o hook
          </p>
        </div>

        {/* Painel de Ações (usa o hook) */}
        <Card
          header={<h2 className="text-2xl font-semibold">Ações</h2>}
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form simples só pra disparar toasts */}
            <div className="space-y-3">
              <Input
                label="Seu nome"
                placeholder="Digite seu nome"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                error={inputError}
              />
              <div className="flex gap-2">
                <Button onClick={handleSubmit}>Enviar</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setInputValue('')
                    setInputError('')
                    addToast('info', 'Limpou', 'Campos resetados.')
                  }}
                >
                  Limpar
                </Button>
              </div>
            </div>

            {/* Botões diretos pro hook */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => addToast('success', 'Top!', 'Operação concluída.')}
                >
                  Success Toast
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => addToast('error', 'Opa!', 'Algo deu ruim.')}
                >
                  Error Toast
                </Button>
                <Button
                  className="bg-yellow-500 hover:bg-yellow-600"
                  size="sm"
                  onClick={() => addToast('warning', 'Atenção', 'Revise os dados.')}
                >
                  Warning Toast
                </Button>
                <Button
                  className="bg-cyan-500 hover:bg-cyan-600"
                  size="sm"
                  onClick={() => addToast('info', 'Info', 'Atualizamos as coisas.')}
                >
                  Info Toast
                </Button>
              </div>

              <Button onClick={() => openModal('exemplo')}>
                Abrir Modal (via hook)
              </Button>
            </div>
          </div>
        </Card>

        {/* Dashboard Card Section */}
        <Card
          header={<h2 className="text-2xl font-semibold">Dashboard Card</h2>}
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              user={{
                name: 'Lucas Sousa',
                role: 'Professor',
                avatar: 'https://picsum.photos/100?random=3',
                initials: 'LS',
                status: 'online',
                active: true
              }}
              stats={[
                { label: 'Projetos', value: 12 },
                { label: 'Alunos', value: 250 },
                { label: 'Cursos', value: 5 }
              ]}
              actions={[
                { label: 'Editar', variant: 'primary', onClick: () => addToast('info', 'Editar', 'Abrindo edição…') },
                { label: 'Excluir', variant: 'danger', onClick: () => addToast('warning', 'Cuidado', 'Confirme antes de excluir.') }
              ]}
            />

            <DashboardCard
              user={{
                name: 'Maria Silva',
                role: 'Engenheira de Software',
                avatar: 'https://picsum.photos/100?random=4',
                initials: 'MS',
                status: 'away',
                active: false
              }}
              stats={[
                { label: 'Commits', value: 532 },
                { label: 'Pull Requests', value: 48 },
                { label: 'Issues', value: 19 }
              ]}
              actions={[
                { label: 'Ativar', variant: 'success', onClick: () => addToast('success', 'Ativado', 'Usuário ativado!') },
                { label: 'Detalhes', variant: 'outline', onClick: () => openModal('detalhes-maria') }
              ]}
            />
          </div>
        </Card>

        {/* Modal controlado pelo hook */}
        <Modal
          isOpen={isModalOpen('exemplo')}
          onClose={() => closeModal('exemplo')}
          title="Modal de Exemplo"
          size="lg"
        >
          <p className="text-gray-600 mb-4">
            Este modal está sendo aberto/fechado via <code>useComponents</code>.
          </p>
          <div className="flex gap-2">
            <Button onClick={() => { addToast('success', 'Fechado', 'Até a próxima!'); closeModal('exemplo') }}>
              Confirmar
            </Button>
            <Button variant="outline" onClick={() => closeModal('exemplo')}>
              Cancelar
            </Button>
          </div>
        </Modal>

        {/* Outro modal pra mostrar múltiplos IDs funcionando */}
        <Modal
          isOpen={isModalOpen('detalhes-maria')}
          onClose={() => closeModal('detalhes-maria')}
          title="Detalhes da Maria"
        >
          <p className="text-gray-600">
            Aqui você colocaria os detalhes que quiser. O importante: cada modal tem seu ID.
          </p>
          <div className="mt-4">
            <Button onClick={() => closeModal('detalhes-maria')}>Fechar</Button>
          </div>
        </Modal>

        {/* Render de todos os toasts vindos do hook */}
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}

      </div>
    </div>
  )
}

export default App
```

## Conclusão

Nesta aula criamos uma biblioteca robusta de componentes React com Tailwind CSS que inclui:

## ✅ Componentes Criados:

- **Button** - Sistema completo de variações e estados
- **Card** - Layout flexível com header/footer
- **Input** - Formulários com validação visual
- **Badge** - Elementos informativos removíveis
- **Modal** - Diálogos acessíveis e responsivos
- **Avatar** - Perfis com status e variações
- **Toast** - Notificações temporárias
- **ProgressBar** - Indicadores de progresso animados
- **Tabs** - Navegação em abas com estilos
- **Rating** - Sistema de avaliação interativo

## 🎯 Conceitos Aplicados:

- **Composição de componentes** para flexibilidade
- **Sistema de variants** para consistência visual
- **Props dinâmicas** para reutilização
- **Estados visuais** para melhor UX
- **Acessibilidade** com foco e navegação por teclado
- **Design tokens** para padronização
