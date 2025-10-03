# Aula – Layouts e Tipografia com Tailwind + React

## 🎯 Objetivos da Aula

- Explorar proporções da tela e colunas com Tailwind;
- Trabalhar com `box-decoration-break`, `float`, `clear` e `z-index`;
- Usar **Flexbox & Grid** para organização de layouts responsivos;
- Customizar tipografia (hierarquia e estilos de texto);
- Inserir e manipular **SVGs** em componentes React.

---

## Passo 1: Configurar o Projeto React com Vite + Tailwind

Primeiro, crie um novo projeto React usando o Vite. Abra seu terminal e execute o seguinte comando:

```bash
npm create vite@latest tailwind-layout
```

Navegue até o diretório do projeto e instale as dependências:

```bash
cd tailwind-layout
npm install
```

Agora configure o Tailwind CSS. Abra seu terminal na raiz do projeto e instale as dependências:

```bash
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

## Passo 2: Criação dos componentes

Antes de começarmos, lembre-se: cada componente React que criarmos é uma peça independente de layout, mas todos eles podem ser reunidos dentro do `App.jsx` para formar a aplicação final. Isso ajuda a treinar a mentalidade de componentização: dividir a interface em blocos reutilizáveis e fáceis de manter.

### 1. Proporção da Tela e Colunas

Esse componente explora layouts em colunas. Usamos `grid-cols` para criar diferentes proporções e destacar áreas principais (texto) versus áreas secundárias (imagem).

```jsx
// components/ThreeColumnHero.jsx
// components/ThreeColumnHero.jsx
export default function ThreeColumnHero() {
  return (
    <section className="h-screen grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      <div className="col-span-1 md:col-span-2 flex flex-col justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white p-8 rounded-lg">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4">Explore o Mundo</h1>
        <p className="text-lg md:text-2xl leading-relaxed">
          Uma experiência visual imersiva com React, Tailwind e imagens de altíssima qualidade.
        </p>
      </div>
      <div className="hidden md:block relative overflow-hidden rounded-lg">
        <img
          src="https://picsum.photos/2680/1770"
          alt="Imagem aleatória"
          className="object-cover w-full h-full"
        />
      </div>
    </section>
  );
}
```

### 2. `box-decoration-break`

Aqui testamos o comportamento de textos quebrados em múltiplas linhas. A propriedade `box-decoration-break` define se o estilo do fundo acompanha a quebra ou não.

```jsx
// components/DecoratedText.jsx
export default function DecoratedText() {
  return (
    <div className="p-6 bg-gray-100 flex justify-center">
      <p className="inline-block bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-2 rounded-lg leading-tight text-xl box-decoration-clone shadow-lg hover:box-decoration-slice transition-all duration-300">
        Este é um texto longo que vai quebrar em múltiplas linhas em telas menores, mostrando o efeito do <span className="font-bold underline">box-decoration-break</span> no Tailwind
      </p>
    </div>
  );
}
```

### 3. Float e Clear

O clássico `float` do CSS ainda é útil em alguns cenários, especialmente quando queremos que uma imagem "flutue" ao lado de um texto. O `clear` é usado para controlar quando um elemento deve parar de respeitar o fluxo do float.

```jsx
// components/FloatedImageArticle.jsx
export default function FloatedImageArticle() {
  return (
    <article className="max-w-3xl mx-auto p-6">
      <img
        src="https://picsum.photos/1200"
        alt="Imagem aleatória"
        className="float-left md:float-start mr-4 mb-4 w-full md:w-1/3 rounded-lg shadow-md"
      />
      <p className="text-gray-700 leading-relaxed text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus vitae libero luctus venenatis. Sed consectetur libero non velit interdum, eu pulvinar purus porttitor. Suspendisse potenti.
      </p>
      <div className="clear-left md:clear-start mt-4 p-2 bg-gray-200 rounded-lg">
        Este bloco usa <code>clear-left</code> para limpar o float acima — em telas menores ou maiores, experimente trocar para <code>md:clear-none</code> ou <code>clear-both</code> para ver o comportamento.
      </div>
    </article>
  );
}
```

### 4. Z-index

O `z-index` controla a ordem das camadas visuais. Neste exemplo, combinamos imagens, textos e SVGs sobrepostos, definindo quem aparece na frente ou atrás.

```jsx
// components/OverlaySVG.jsx
export default function OverlaySVG() {
  return (
    <div className="relative h-[400px] w-full bg-gray-800 overflow-hidden">
      <img
        src="https://picsum.photos/1200/400"
        alt="Abstract"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4">Bem-vindo(a)</h2>
        <p className="text-lg md:text-2xl">Tailwind + React com camadas visuais ricas</p>
        <svg
          className="w-16 h-16 md:w-24 md:h-24 mt-6 text-pink-400 z-30"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 12h3v7h6v-4h2v4h6v-7h3z" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 z-10 p-4">
        <svg
          className="w-32 h-32 text-blue-500 opacity-70"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
    </div>
  );
}
```

### 5. Flexbox & Grid

O Flexbox é ótimo para alinhar e distribuir elementos em linha ou coluna, enquanto o Grid cria estruturas mais complexas de colunas e linhas. Aqui temos exemplos simples de ambos.

#### Felxbox

```jsx
// components/FlexExemplo.jsx
export default function FlexExemplo() {
  return (
    <div className="flex items-center justify-around h-40 bg-gray-100">
      <div className="w-20 h-20 bg-red-300"></div>
      <div className="w-20 h-20 bg-blue-300"></div>
      <div className="w-20 h-20 bg-green-300"></div>
    </div>
  );
}
```

#### Grid

```jsx
// components/GridExemplo.jsx
export default function GridExemplo() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-purple-300 h-20 flex items-center justify-center">
          {i + 1}
        </div>
      ))}
    </div>
  );
}
```

### 6. Tipografia

A tipografia organiza a hierarquia de textos. Usamos diferentes `font-size`, `font-weight` e estilos para criar contraste entre títulos, subtítulos, parágrafos e citações.

```jsx
// components/Tipografia.jsx
export default function Tipografia() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-4xl md:text-5xl font-extrabold">Título Principal</h1>
      <h2 className="text-2xl md:text-3xl font-semibold">Subtítulo</h2>
      <p className="text-gray-700 leading-relaxed">
        Texto corrido com <span className="italic text-blue-600">destaque</span> e variações de peso e cor.
      </p>
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
        "Exemplo de citação com estilo tipográfico diferenciado."
      </blockquote>
    </div>
  );
}
```

### 7. Galeria com Grid + Flex + Hover

Uma galeria que mistura Grid no desktop e Flex no mobile. Também adicionamos efeitos `hover` para enriquecer a interação.

```jsx
// components/GalleryHybrid.jsx
const images = [
  "https://picsum.photos/600?random=1",
  "https://picsum.photos/600?random=2",
  "https://picsum.photos/600?random=3",
  "https://picsum.photos/600?random=4",
  "https://picsum.photos/600?random=5",
  "https://picsum.photos/600?random=6"
];

export default function GalleryHybrid() {
  return (
    <section className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.slice(0, 3).map((src, i) => (
          <div key={i} className="h-64 overflow-hidden rounded-lg shadow-lg">
            <img src={src} alt={`Gallery ${i}`} className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500" />
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap md:hidden gap-4 justify-center">
        {images.slice(3).map((src, i) => (
          <div key={i} className="w-32 h-32 overflow-hidden rounded-lg shadow-md">
            <img src={src} alt={`Gallery small ${i}`} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
```

## Passo 3: Montando o App.jsx

Agora vamos reunir todos os componentes criados. O `App.jsx` funciona como um painel central, exibindo cada recurso aprendido em seções independentes.

```jsx
// src/App.jsx
import ThreeColumnHero from "./components/ThreeColumnHero";
import DecoratedText from "./components/DecoratedText";
import FloatedImageArticle from "./components/FloatedImageArticle";
import OverlaySVG from "./components/OverlaySVG";
import FlexExemplo from "./components/FlexExemplo";
import GridExemplo from "./components/GridExemplo";
import Tipografia from "./components/Tipografia";
import GalleryHybrid from "./components/GalleryHybrid";

function App() {
  return (
    <div className="space-y-12">
      <ThreeColumnHero />
      <DecoratedText />
      <FloatedImageArticle />
      <OverlaySVG />
      <FlexExemplo />
      <GridExemplo />
      <Tipografia />
      <GalleryHybrid />
    </div>
  );
}

export default App;
```

### Mini Projeto

Monte uma landing page simples com:

- Header fixo com z-index;
- Grid principal dividido em duas colunas (texto e imagem);
- Imagem flutuante com float;
- Teto com box-decoration-break;
- Títulos bem definidos com tipografia;
- Ícones SVG no rodapé.

### Atividades em Sala 💪

1. Criar uma seção de 3 colunas usando grid com imagens.
2. Montar um card de perfil com título, descrição e um ícone SVG.
3. Criar uma sobreposição de elementos com z-index.
4. Reproduzir uma notícia com imagem float e clear.
5. Desafio: criar um layout híbrido Flex + Grid para uma galeria.
