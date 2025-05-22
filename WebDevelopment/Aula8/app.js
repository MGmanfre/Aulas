// const btnClicar = document.getElementById('btnClicar');
// const paragrafo = document.getElementById('paragrafo');
// btnClicar.addEventListener('click', function () {
//     paragrafo.textContent = `${paragrafo.textContent === 'Texto Variável' ? 'Olá Aluno!' : 'Texto Variável'}`;
// })

const form = document.getElementById('form');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputGenero = document.getElementById('genero');
const inputMensagem = document.getElementById('mensagem');
const btnEnviar = document.getElementById('btnEnviar');
const cadastros = document.getElementById('cadastros'); // Fix: Define the cadastros element

btnEnviar.addEventListener('click', function (event) {
    event.preventDefault();
    let nome = inputNome.value;
    let email = inputEmail.value;
    let genero = inputGenero.value;
    let mensagem = inputMensagem.value;

    if (nome === '' || email === '' || genero === 'option0' || mensagem === '') {
        alert('Preencha todos os campos!');
        return;
    }

    alert(`Nome: ${nome}\nEmail: ${email}\nGênero: ${genero}\nMensagem: ${mensagem}`);
    const cardUsuario = document.createElement('div');
    cardUsuario.innerHTML = `
    <h3>${nome}</h3>
    <p>${email}</p>
    `;
    cadastros.appendChild(cardUsuario);
    form.reset();
});