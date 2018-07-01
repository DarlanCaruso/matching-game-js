var contador = document.querySelector('#movimentos');
var vetorCartas = [
    { id: 0, icone: "fas fa-code" },
    { id: 1, icone: "fab fa-codepen" },
    { id: 2, icone: "fas fa-code-branch" },
    { id: 3, icone: "fab fa-free-code-camp" },
    { id: 4, icone: "fas fa-terminal" },
    { id: 5, icone: "fab fa-css3" },
    { id: 6, icone: "fas fa-qrcode" },
    { id: 7, icone: "fab fa-linode" },
];
var cartas = vetorCartas.concat(vetorCartas);

//Adiciona o contador

function adicionarContador() {
    contador.innerHTML++;
};

//Reinicia o jogo

function reiniciarJogo() {
    contador.innerHTML = 0;
};

//Retorna as cartas em posições aleatórias

function retornarCartas(cartas) {
    var index = cartas.length, valorTemporario, indexAleatorio;

    while(0 != index) {
        indexAleatorio = Math.floor(Math.random() * index);
        index -= 1;

        valorTemporario = cartas[index];
        cartas[index] = cartas[indexAleatorio];
        cartas[indexAleatorio] = valorTemporario;
    }

    return cartas;
};

cartas = retornarCartas(cartas);
console.log(cartas);
