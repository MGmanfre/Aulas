import './App.css'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header 
        titulo="meu pai"
        texto="texto1"
        cor="red"></Header>
      <Header 
        titulo="Vitor"
        texto="texto2"
        cor="blue"></Header>
      <Header 
        titulo="igor newba"
        texto="texto3"
        cor="orange"></Header>
    </>
  )
}

export default App
