//Contador
var contador = document.querySelector('#movimentos');

//Lista de cartas
var vetorCartas = [
    { id: 0, icone: "fa-angular" },
    { id: 1, icone: "fa-codepen" },
    { id: 2, icone: "fa-react" },
    { id: 3, icone: "fa-free-code-camp" },
    { id: 4, icone: "fa-vuejs" },
    { id: 5, icone: "fa-css3" },
    { id: 6, icone: "fa-ember" },
    { id: 7, icone: "fa-linode" },
];

//Duplica as cartas
var cartas = vetorCartas.concat(vetorCartas);

//Retorna o vetor em posições aleatórias
cartas = retornarCartas(cartas);

//Verifica se a carta selecionada é a mesma ou não
function matchingGame(colunas) {
    var cartaEscolhida = [];
    colunas.forEach(coluna => {
        coluna.addEventListener('click', () => {
            var id = coluna.className[11];
            var posicaoColuna = coluna.id;
            cartaEscolhida.push({id: id, posicao: posicaoColuna});
            if (cartaEscolhida.length > 1) {
                if (cartaEscolhida[0].id === cartaEscolhida[1].id) {
                    toggleClass(cartaEscolhida, true);
                } else {
                    toggleClass(cartaEscolhida, false);
                };
                cartaEscolhida = [];
            };
        });
    });
};

//Adicona a classe referente ao acerto ou erro
function toggleClass(vetorEscolhido, acerto) {
    if(acerto) {
        document.querySelector(`#${vetorEscolhido[0].posicao.toString()} .flip-container`).classList.add('hover');
        document.querySelector(`#${vetorEscolhido[0].posicao.toString()} .flip-container .back`).classList.add('opcao-correta');
        document.querySelector(`#${vetorEscolhido[0].posicao.toString()}`).removeEventListener('click', () => { });
        document.querySelector(`#${vetorEscolhido[1].posicao.toString()} .flip-container`).classList.add('hover');
        document.querySelector(`#${vetorEscolhido[1].posicao.toString()} .flip-container .back`).classList.add('opcao-correta');
        document.querySelector(`#${vetorEscolhido[1].posicao.toString()}`).removeEventListener('click', () => { });
    } else {
        document.querySelector(`#${vetorEscolhido[0].posicao.toString()} .flip-container`).classList.add('hover');
        document.querySelector(`#${vetorEscolhido[1].posicao.toString()} .flip-container`).classList.add('hover');
        document.querySelector(`#${vetorEscolhido[0].posicao.toString()} .flip-container .back`).classList.add('opcao-incorreta');
        document.querySelector(`#${vetorEscolhido[1].posicao.toString()} .flip-container .back`).classList.add('opcao-incorreta');
        window.setTimeout(() => {
            document.querySelector(`#${vetorEscolhido[0].posicao.toString()} .flip-container`).classList.remove('hover');
            document.querySelector(`#${vetorEscolhido[1].posicao.toString()} .flip-container`).classList.remove('hover');
        }, 700);
        window.setTimeout(() => {
            document.querySelector(`#${vetorEscolhido[0].posicao.toString()} .flip-container .back`).classList.remove('opcao-incorreta');
            document.querySelector(`#${vetorEscolhido[1].posicao.toString()} .flip-container .back`).classList.remove('opcao-incorreta');
        }, 1000);
    }
}

//Renderiza as cartas no browser
function renderizarCartas(cartas) { 
    renderizarElementos();
    var colunas = document.querySelectorAll('.col');
    for(i = 0; i < cartas.length; i++) {
        var flipperContainer = document.createElement('div');
        flipperContainer.classList.add('flip-container');
        var flipper = document.createElement('div');
        flipper.classList.add('flipper');
        var front = document.createElement('div');
        front.classList.add('front');
        var back = document.createElement('div');
        back.classList.add('back');
        var icone = document.createElement('i');
        icone.classList.add('fab');
        icone.classList.add(`${cartas[i].icone.toString()}`);
        colunas[i].id =  'col-'+i;
        colunas[i].classList.add('coluna-' + cartas[i].id);
        flipper.appendChild(front);
        flipper.appendChild(back);
        back.appendChild(icone);
        flipperContainer.appendChild(flipper);
        colunas[i].appendChild(flipperContainer);
    }
    matchingGame(colunas);
};

//Cria os elementos do DOM
function renderizarElementos() {
    for (var i = 0; i < 4; i++) {
        var container = document.querySelector('#cartas');
        var row = document.createElement('div');
        row.classList.add('row');
        row.id = 'row-'+i;
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
    //renderizarCartas();
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

reiniciarJogo();
renderizarCartas(cartas);