//Contador

var contador = document.querySelector('#movimentos');
var resultado = 0;

//Container

var container = document.querySelector('#cartas');

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
        coluna.querySelector('.front').addEventListener('click', () => {
            var id = coluna.className[coluna.className.length - 1];
            var posicaoColuna = coluna.id;
            cartaEscolhida.push({id: id, posicao: posicaoColuna});
            adicionarContador();
            if (cartaEscolhida.length > 1) {
                if (cartaEscolhida[0].id === cartaEscolhida[1].id && cartaEscolhida[0].posicao !== cartaEscolhida[1].posicao) {
                    toggleClass(cartaEscolhida, true);
                    resultado++;
                    if(resultado === 8) {
                        window.scrollTo(0,0);
                        document.querySelector('body').setAttribute('style', 'overflow-y: hidden');
                        document.querySelector('#resultado').setAttribute('style', 'display: block');
                        document.querySelector('#movimentos-resultado').innerHTML = contador.innerHTML;
                    }
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
        document.querySelector(`#${vetorEscolhido[0].posicao.toString()} .flip-container .back`).setAttribute('disabled', 'disabled');
        document.querySelector(`#${vetorEscolhido[1].posicao.toString()} .flip-container`).classList.add('hover');
        document.querySelector(`#${vetorEscolhido[1].posicao.toString()} .flip-container .back`).classList.add('opcao-correta');
        document.querySelector(`#${vetorEscolhido[1].posicao.toString()} .flip-container .back`).setAttribute('disabled', 'disabled');
    } else {
        document.querySelector(`#${vetorEscolhido[0].posicao.toString()} .flip-container`).classList.add('hover');
        document.querySelector(`#${vetorEscolhido[0].posicao.toString()} .flip-container .back`).classList.add('opcao-incorreta');
        document.querySelector(`#${vetorEscolhido[1].posicao.toString()} .flip-container`).classList.add('hover');
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

//Cria os elementos do DOM

function renderizarElementos() {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    };

    for (var i = 0; i < 4; i++) {
        var row = document.createElement('div');
        row.classList.add('row');
        row.id = 'row-'+i;
        for (var j = 0; j < 4; j++) {
            var col = document.createElement('div');
            col.classList.add('col-6');
            col.classList.add('col-sm-6');
            col.classList.add('col-md-3');
            col.classList.add('col-lg-3');
            col.classList.add('col-xs-3');
            row.appendChild(col);
        };
        container.appendChild(row);
    };

    var colunas = document.querySelectorAll('.col-6');

    for (i = 0; i < cartas.length; i++) {
        var flipperContainer = document.createElement('div');
        var flipper = document.createElement('div');
        var front = document.createElement('button');
        var back = document.createElement('button');
        var icone = document.createElement('i');

        flipperContainer.classList.add('flip-container');
        flipper.classList.add('flipper');
        front.classList.add('front');
        back.classList.add('back');
        icone.classList.add('fab');
        icone.classList.add(`${cartas[i].icone.toString()}`);
        colunas[i].classList.add('coluna-' + cartas[i].id);
        colunas[i].id = 'col-' + i;
                
        flipper.appendChild(front);
        flipper.appendChild(back);
        back.appendChild(icone);
        flipperContainer.appendChild(flipper);
        colunas[i].appendChild(flipperContainer);
    };

    matchingGame(colunas);
};

//Adiciona o contador

function adicionarContador() {
    contador.innerHTML++;
};

//Reinicia o jogo

function reiniciarJogo() {
    contador.innerHTML = 0;
    cartas = retornarCartas(cartas);
    renderizarElementos();
    document.querySelector('body').setAttribute('style', 'overflow-y: scroll');
    document.querySelector('#resultado').setAttribute('style', 'display: none');
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

renderizarElementos();

//Protege o jogo contra trapaças

function retornaAviso() {
    window.scrollTo(0, 0);
    document.querySelector('body').setAttribute('style', 'overflow-y: hidden');
    document.querySelector('#aviso').setAttribute('style', 'display: block');
};

$(document).keydown(function (event) {
    if (event.keyCode == 123) { // Prevent F12
        retornaAviso();
        return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
        retornaAviso();
        return false;
    }
});

$(document).on("contextmenu", function (e) {
    e.preventDefault();
    retornaAviso();
});

function fecharAviso() {
    document.querySelector('body').setAttribute('style', 'overflow-y: scrol');
    document.querySelector('#aviso').setAttribute('style', 'display: none');
};