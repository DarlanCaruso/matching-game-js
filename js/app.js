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
cartas = retornarCartas(cartas);

function renderizarCartas() { 
    renderizarElementos();
    var colunas = document.querySelectorAll('.col');
    for(i = 0; i < cartas.length; i++) {
        colunas[i].innerHTML = cartas[i].id;
    };
};

function renderizarElementos() {
    for (var i = 0; i < 4; i++) {
        var container = document.querySelector('#cartas');
        var row = document.createElement('div');
        row.classList.add('row');
        row.id = i;
        for (var j = 0; j < 4; j++) {
            var col = document.createElement('div');
            col.classList.add('col');
            row.appendChild(col);
        }
        container.appendChild(row);
    };
};

//Adiciona o contador
function adicionarContador() {
    contador.innerHTML++;
};

//Reinicia o jogo
function reiniciarJogo() {
    contador.innerHTML = 0;
    cartas = retornarCartas(cartas);
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