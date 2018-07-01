var contador = document.querySelector('#movimentos');
var cartas = [
    { id: 0, icone: "fas fa-code" },
    { id: 1, icone: "fab fa-codepen" },
    { id: 2, icone: "fas fa-code-branch" },
    { id: 3, icone: "fab fa-free-code-camp" },
    { id: 4, icone: "fas fa-terminal" },
    { id: 5, icone: "fab fa-css3" },
    { id: 6, icone: "fas fa-qrcode" },
    { id: 7, icone: "fab fa-linode" },
];
var todasCartas = cartas.concat(cartas);
todasCartas.sort();
console.log(todasCartas);

function adicionarContador() {
    contador.innerHTML++;
};

function reiniciarJogo() {
    contador.innerHTML = 0;
};

