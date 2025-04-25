// function pagaNome() {
//     let nome = "Miguel"
//     return nome
// }

// function exibirNome() {
//     let resultado = pagaNome()
//     console.log(resultado)
// }

// exibirNome()

// function somaDoisNumeros(primeiroNumero, segundoNumero = 0) {
//     return primeiroNumero + segundoNumero
// }


// console.log(somaDoisNumeros(10, 10))
// console.log(somaDoisNumeros(35, 57))
// console.log(somaDoisNumeros(28))

// const somaNumero = (num1,num2) => num1 + num2

// 

let nome = " Miguel "

console.log(nome.length)
console.log(nome.toUpperCase())
console.log(nome.toLowerCase())
console.log(nome.includes("dcaw"))
console.log(nome)
console.log(nome.trim())

let num = 5.432423
console.log(num.toFixed())
console.log(isNaN(num))
console.log(isNaN(nome))

const preco = 1000.00
console.log(preco.toLocaleString("pt-br",
    style = "currency"

))

console.log(Math.floor(Math.random() * 11))
console.log(Math.round(Math.random() * 11))
console.log(Math.ceil(Math.random() * 11))

let dataAtual = new Date()
console.log(dataAtual.getDate())
