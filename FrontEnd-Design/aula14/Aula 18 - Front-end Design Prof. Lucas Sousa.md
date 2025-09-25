# Animações e Transições Avançadas com Tailwind CSS

## 🎯 Objetivos da Aula

- Explorar transições e animações avançadas com Tailwind CSS  
- Criar animações personalizadas usando `@keyframes`  
- Aprender a animar elementos ao rolar a página com `IntersectionObserver`  
- Consolidar o uso de animações com Tailwind em um projeto prático  

## 📋 Índice

1. Introdução às Transições e Animações Avançadas  
2. Utilitários de Transição (`transition`, `duration`, `ease`, `delay`)  
3. Utilitários de Animação (`animate-*`)  
4. Criando Animações Customizadas com `@keyframes`  
5. Detalhes do `tailwind.config.js`  
6. Animações com Scroll (Intersection Observer + Tailwind)  
7. Projeto Prático: Alerta animado + botão + fade in/out  
8. Desafio da Aula: Loader animado com animação personalizada  

## 1. Introdução às Transições e Animações Avançadas

Tailwind facilita aplicar transições e animações. Hoje vamos além do `hover:scale` e entrar em keyframes, lógica condicional e até rolagem.

## 2. Utilitários de Transição

```html
<button class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
  Clique Suave
</button>
```

Utilitários úteis:

- `transition`  
- `duration-{ms}`  
- `ease-in`, `ease-out`, `ease-in-out`, `linear`  
- `delay-{ms}`  

## 3. Utilitários de Animação

Tailwind já traz algumas animações prontas:

```html
<!-- 
 Para entendermos melhor o uso das unidades no Tailwind:
 1 -> 0.25rem -> 4px (logo 4 -> 1rem -> 16px) 
 -->
<div class="w-10 h-10 bg-blue-500 rounded-full animate-bounce"></div>
```

Outros exemplos:

- `animate-spin`  
- `animate-ping`  
- `animate-pulse`  

## 4. Criando Animações Customizadas com @keyframes

Você pode criar animações personalizadas no `tailwind.config.js`:

```js
// tailwind.config.js
tailwind.config = {
  theme: {
    extend: {
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        fade: 'fade 1s ease-in-out infinite',
        wiggle: 'wiggle 0.5s ease-in-out infinite',
      },
    }
  }
}
```

Ou chamar o script de forma interna no html:

```html
<script>
    tailwind.config = {
      //codigo de configuração
    }
</script>
```

E depois usar no HTML:

```html
<head>
  <script src="tailwind.config.js"></script>
</head>
<body>
  <div class="p-4 bg-green-300 rounded animate-fade w-20">Fade</div>
  <button class="animate-wiggle">Treme</button>
  <div class="animate-wiggle w-40 h-10 bg-green-500 rounded-full"></div>
  <div class="animate-fade w-10 h-10 bg-yellow-400 rounded-full"></div>
</body>
```

É possivel ainda ter os mesmos efeitos de criação de animações com Tailwind usando somente CSS:

```html
<style type="text/tailwindcss">
  @layer utilities {
    @keyframes fade {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    @keyframes wiggle {
      0%, 100% { transform: rotate(-3deg); }
      50% { transform: rotate(3deg); }
    }
    .animate-fade {
      animation: fade 1s ease-in-out infinite;
    }
    .animate-wiggle {
      animation: wiggle 0.5s ease-in-out infinite;
    }
  }
</style>
```

## 5. Detalhes do `tailwind.config.js`

Esse arquivo é onde você estende o Tailwind com customizações. Ele é essencial quando você quer sair do básico e deixar tudo com a sua cara.

### O que dá pra fazer nele:

- Criar animações personalizadas via `@keyframes`  
- Adicionar cores, espaçamentos e fontes customizadas  
- Definir novos breakpoints e tamanhos responsivos  
- Habilitar plugins do Tailwind  
- Controlar quais arquivos são escaneados via `content`  

Você só vai precisar desse arquivo se estiver trabalhando **sem CDN** (ex: com build local usando PostCSS ou Vite). Como ainda usamos via CDN, você pode simular esse comportamento com `tailwind.config = { ... }` direto no HTML usando JS.

## 6. Animações com Scroll (Intersection Observer + Tailwind)

Vamos fazer elementos aparecerem quando entram na viewport:

```html
<!-- HTML -->
<div class="opacity-0 transition-opacity duration-700" data-observe>
  Aparece ao rolar!
</div>

<!-- JS -->
<script>
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100');
      }
    });
  });
  document.querySelectorAll('[data-observe]').forEach(el => observer.observe(el));
</script>
```

## 7. Projeto Prático

```html
<button onclick="document.getElementById('alerta').classList.remove('hidden')"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Mostrar Alerta
</button>

<div id="alerta" class="hidden w-80 mt-4 p-4 bg-red-100 text-red-800 rounded animate-fade">
  ⚠️ Isso é um alerta animado!
</div>
```

## 8. Desafio da Aula

Crie um **loader animado** com uma animação personalizada.  
Dica: combine rotação com mudança de cor. Pode usar `@keyframes`, e se quiser ir além.

## 💻 Arquivo `index.html` da Aula

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Animações</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="tailwind.config.js"></script>
  <!-- <script>
    tailwind.config = {
      theme: {
        extend: {
          keyframes: {
            fade: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' },
            },
            wiggle: {
              '0%, 100%': { transform: 'rotate(-3deg)' },
              '50%': { transform: 'rotate(3deg)' },
            },
          },
          animation: {
            fade: 'fade 1s ease-in-out infinite',
            wiggle: 'wiggle 0.5s ease-in-out infinite',
          },
        }
      }
    }
  </script> -->

  <!-- <style type="text/tailwindcss">
    @layer utilities {
      @keyframes fade {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      @keyframes wiggle {
        0%, 100% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
      }
      .animate-fade {
        animation: fade 1s ease-in-out infinite;
      }
      .animate-wiggle {
        animation: wiggle 0.5s ease-in-out infinite;
      }
    }
  </style> -->
</head>

<body class="p-8 space-y-6">
  <!-- 1 -> 0.25rem -> 4px (logo 4 -> 1rem -> 16px) -->
  <button class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
    Clique Suave
  </button>

  <div class="w-10 h-10 bg-blue-500 rounded-full animate-bounce"></div>

  <div class="p-4 bg-green-300 rounded animate-fade w-20">Fade</div>

  <button class="animate-wiggle">Treme</button>

  <div class="animate-wiggle w-40 h-10 bg-green-500 rounded-full"></div>
  <div class="animate-fade w-10 h-10 bg-yellow-400 rounded-full"></div>

  <p>Lorem500</p>

  <div class="opacity-0 transition-opacity duration-700 w-40 bg-blue-500 p-4 rounded-md" data-observe>
    Aparece ao rolar!
  </div>

  <p>Lorem500</p>

  <script>
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
        }
      });
    });
    document.querySelectorAll('[data-observe]').forEach(el => observer.observe(el));
  </script>

  <button onclick="document.getElementById('alerta').classList.remove('hidden')"
    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
    Mostrar Alerta
  </button>

  <div id="alerta" class="hidden w-80 mt-4 p-4 bg-red-100 text-red-800 rounded animate-fade">
    ⚠️ Isso é um alerta animado!
  </div>
</body>
</html>
```
