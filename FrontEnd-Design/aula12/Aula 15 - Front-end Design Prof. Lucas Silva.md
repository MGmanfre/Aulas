# Introdução ao Tailwind CSS

📌 O que é Tailwind?
* Um framework CSS utilitário-first.
* Permite construir interfaces rapidamente sem precisar escrever CSS customizado.
* Usa classes utilitárias para estilizar elementos diretamente no HTML/JSX.

📌 Por que usar Tailwind?

* Agilidade no desenvolvimento.
* Facilita a manutenção do código.
* Alto desempenho com tree-shaking (remove classes não utilizadas).

>
> O termo **"utilitário-first"** significa que o Tailwind CSS prioriza o uso de **classes utilitárias** para estilizar os elementos, em vez de criar estilos personalizados no CSS.  
>  
> Em frameworks tradicionais como Bootstrap, você geralmente usa **classes pré-definidas** ou escreve CSS separado para estilizar elementos. Já no Tailwind, você aplica **classes diretamente no HTML/JSX** para definir estilos específicos.  
>  
> 🔹 **Exemplo de um botão no Bootstrap:**  
> ```html
> <button class="btn btn-primary">Clique aqui</button>
> ```
> Nesse caso, o Bootstrap já define os estilos dentro da classe `.btn-primary`.  
>  
> 🔹 **Exemplo de um botão no Tailwind (utilitário-first):**  
> ```html
> <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
>   Clique aqui
> </button>
> ```
> Aqui, cada classe (`bg-blue-500`, `text-white`, etc.) representa um estilo individual. Isso dá muito mais controle e flexibilidade.
> 


# Projeto React com Vite e Tailwind CSS

Este projeto é uma configuração básica de React com Vite e Tailwind CSS para o desenvolvimento de interfaces de usuário rápidas e eficientes.


## 🚀 Passo 1: Configurando o Projeto com Vite

O Vite é uma ferramenta de build rápida para projetos web modernos. Vamos começar criando nosso ambiente de desenvolvimento.

1. **Abra seu terminal** ou linha de comando.

2. **Crie um novo projeto React com Vite:**

   ```bash
   npm create vite@latest aula-tailwind --template react
   ```

   * `aula-tailwind`: É o nome da pasta do seu projeto.

   * `--template react`: Indica que queremos um projeto React (JavaScript). Se preferir TypeScript, use `--template react-ts`.

3. **Navegue até a pasta do projeto:**

   ```bash
   cd aula-tailwind
   ```

4. **Instale as dependências do projeto:**

   ```bash
   npm install
   ```

5. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

   Seu navegador deve abrir automaticamente (ou você pode acessar manualmente) `http://localhost:5173` (ou outra porta disponível) para ver a aplicação React inicial.

---

## 💅 Passo 2: Instalando e Configurando o Tailwind CSS

Para deixar a interface mais apresentável e moderna, vamos adicionar o Tailwind CSS ao nosso projeto Vite.

1. **Instale o Tailwind CSS e suas dependências:**
   Ainda no terminal, dentro da pasta `aula-tailwind`, execute:

   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

2. **Configure o Vite plugin:**
   Adicione o `@tailwindcss/viteplugin` à sua configuração do Vite.

   ```js
    import { defineConfig } from 'vite'
    import tailwindcss from '@tailwindcss/vite'
    export default defineConfig({
        plugins: [
            tailwindcss(),
        ],
    })
   ```

3. **Adicione as diretivas do Tailwind ao seu CSS:**
   Abra o arquivo `src/index.css` (ou `src/App.css` se preferir) e adicione as diretivas `@tailwind` no topo:

   ```css
   /* src/index.css (ou src/App.css) */
   @import "tailwindcss";
   ```

   Certifique-se de que este arquivo CSS está sendo importado em seu `main.jsx` (ou `main.tsx`) ou `App.jsx`. O projeto já vem com `import './App.css'`, então podemos usar ele.

---

## Recursos Adicionais
* [Documentação do Vite](https://vitejs.dev/)  
* [Documentação do Tailwind CSS](https://tailwindcss.com/) 

## Prática - Criando um Card Responsivo

Criar o componente `Card.jsx`

```js
const Card = () => {
    return (
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden">
        <img
          className="w-full h-60 object-cover"
          src="https://source.unsplash.com/400x300/?technology"
          alt="Imagem Ilustrativa"
        />
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Título do Card</h2>
          <p className="text-gray-600 mt-3">
            Esta é uma descrição de exemplo para mostrar como o Tailwind facilita a estilização.
          </p>
          <button className="mt-5 w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300">
            Saiba Mais
          </button>
        </div>
      </div>
    );
  };
  
  export default Card;
```
Exibir no `App.jsx`

```js
import Card from "./Card";

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <Card />
    </div>
  );
}

export default App;

```
---
# Principais Conceitos do Tailwind CSS
### 1. Classes Utilitárias:

* Em vez de escrever um arquivo CSS separado e definir seletores de classes e propriedades CSS, você aplica classes específicas diretamente no HTML.
* Cada classe faz uma tarefa única e pequena. Por exemplo:
    * `text-blue-500`: Define a cor do texto como azul.
    * `bg-gray-100`: Define a cor de fundo como cinza claro.
    * `p-4`: Define um padding de 1rem em todos os lados.
    * `m-2`: Define uma margem de 0.5rem.

### 2. Responsividade e Breakpoints:

* O Tailwind facilita o design responsivo com prefixos de breakpoints. Cada utilitário pode ser usado em diferentes tamanhos de tela com prefixos como `sm:`, `md:`, `lg:`, etc.
* Por exemplo:
    * `text-lg md:text-xl lg:text-2xl`: Define o tamanho do texto de forma responsiva, sendo maior em telas médias e grandes.
    * `p-2 md:p-4 lg:p-8`: Ajusta o padding conforme o tamanho da tela.

## Exemplo de Uso do Tailwind CSS

Exemplo de um componente simples estilizado com Tailwind em um HTML:

```html
<div class="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
  <img class="w-full" src="imagem.jpg" alt="Imagem">
  <div class="px-6 py-4">
    <h2 class="font-bold text-xl mb-2 text-gray-800">Título</h2>
    <p class="text-gray-700 text-base">
      Descrição do conteúdo vai aqui. Com o Tailwind, você estiliza de maneira rápida e eficiente.
    </p>
  </div>
</div>
```

Neste exemplo:

* `max-w-sm` define a largura máxima do contêiner.
* `rounded` adiciona bordas arredondadas.
* `overflow-hidden` controla o overflow para elementos filhos.
* `shadow-lg` adiciona uma sombra grande ao contêiner.
* `p-4` adiciona padding ao redor do contêiner.
* `bg-white`, `text-gray-800`, `font-bold`, etc., definem cores e fontes.

## Vantagens do Tailwind CSS
* **Produtividade**: Acelera a construção de interfaces sem escrever CSS manualmente.
* **Consistência**: Facilita o design consistente com classes reutilizáveis.
* **Personalização**: Totalmente customizável com tema próprio.

---

# Fazer o Deploy no Vercel:

Fazer o deploy pela interface da web, vá até a dashboard da Vercel, clique em "New Project" e selecione seu repositório. O Vercel fará o setup automático.

O Vercel irá detectar automaticamente que você está usando Vite e configurará o deploy.

## Configurar as Rotas:

Se você estiver utilizando o React Router ou qualquer outro sistema de rotas, você pode precisar configurar a página 404 na Vercel para evitar erros 404 ao recarregar. Para isso, você pode criar um arquivo `vercel.json` na raiz do seu projeto e adicionar as seguintes configurações:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```
---
# Fazer o Deploy no GitHub Pages

1. Vincule o projeto local ao repositório remoto:

  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/seu-usuario/meu-projeto.git
  git push -u origin main
  ```

2. Instale o pacote gh-pages:
  
  ```bash
  npm install --save-dev gh-pages
  ```

3. Configure o package.json:

Abra o arquivo package.json do seu projeto e adicione as seguintes propriedades:
  ```js
  "homepage": "https://seu-usuario.github.io/meu-projeto",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
  ```

4. Construa a aplicação para produção:

  ```bash
  npm run build
  ```

5. Faça o deploy:

  ```bash
  npm run deploy
  ```

6. Acesse sua aplicação:

https://seu-usuario.github.io/meu-projeto