# Design Responsivo e Animações com Tailwind CSS

## 🌟 Objetivos da Aula

- Entender os princípios do design responsivo usando Tailwind.
- Aprender como aplicar animações e transições usando utilitários da biblioteca.
- Construir uma pequena interface responsiva com elementos animados.

---

## 1. Introdução ao Tailwind CSS

- O que é Tailwind e como funciona.
- Vantagens do uso de classes utilitárias.
- Instalação (via CDN para testes rápidos ou via npm para projetos reais).

```html
<!-- Exemplo via CDN -->
<script src="https://cdn.tailwindcss.com"></script>
```

---

## 2. Design Responsivo com Tailwind

### Breakpoints

- `sm`, `md`, `lg`, `xl`, `2xl`
- Como usá-los:

```html
<div class="bg-red-500 md:bg-green-500 lg:bg-blue-500">
  Cor muda com o tamanho da tela
</div>
```

### Layout Responsivo

- Grids e Flexbox
- Exemplo de grid responsivo:

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-gray-200 p-4">Item 1</div>
  <div class="bg-gray-200 p-4">Item 2</div>
  <div class="bg-gray-200 p-4">Item 3</div>
</div>
```

---

## 3. Animações e Transições

### Transições básicas

```html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
  Hover me
</button>
```

### Animações com `animate-*`

Tailwind vem com algumas animações prontas, como `animate-bounce`, `animate-spin`, etc.

```html
<div class="w-16 h-16 bg-purple-500 animate-bounce"></div>
```

### Animações customizadas

- Usando `@keyframes` e `extend` no `tailwind.config.js` para criar novas animações.

---

## 4. Mini Projeto Prático 🚀

**Objetivo:** Criar um card responsivo com uma animação ao passar o mouse.

```html
<div class="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-500">
  <h2 class="text-xl font-bold text-gray-900">Título do Card</h2>
  <p class="mt-2 text-gray-600">Esse é um exemplo de card animado e responsivo com Tailwind CSS.</p>
</div>
```

---

## 5. Dicas Extras

- Usar o plugin [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- Tailwind Play para testar online: [https://play.tailwindcss.com](https://play.tailwindcss.com)

---

## 6. Atividade em Sala

Criar uma landing page simples com cabeçalho, três seções responsivas com transformações e um botão animado.

## Exemplo de aula

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Design Responsivo e Animações com Tailwind CSS</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="m-4">
    <div class="bg-red-500 md:bg-green-500 lg:bg-blue-500">
        Cor muda com o tamanho da tela
    </div>

    <br>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-gray-200 p-4">Item 1</div>
        <div class="bg-gray-200 p-4">Item 2</div>
        <div class="bg-gray-200 p-4">Item 3</div>
    </div>

    <br>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
        Hover me
    </button>

    <br><br>

    <div class="flex justify-center items-center">
        <div class="bg-gray-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 w-1/2">
            Este é um card com sombra e animação de hover.
        </div>
    </div>
    
    <br><br>

    <div class="w-16 h-16 bg-purple-500 animate-bounce"></div>

    <br><br>

    <div class="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-500">
        <h2 class="text-xl font-bold text-gray-900">Título do Card</h2>
        <p class="mt-2 text-gray-600">Esse é um exemplo de card animado e responsivo com Tailwind CSS.</p>
    </div>
</body>
</html>
```
