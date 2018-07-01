//Contador
var contador = document.querySelector('#movimentos');

//Lista de cartas
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
            console.log(cartaEscolhida);
            if (cartaEscolhida.length > 1) {
                if (cartaEscolhida[0].id === cartaEscolhida[1].id) {
                    document.querySelector(`#${cartaEscolhida[0].posicao.toString()}`).classList.add('opcao-correta');
                    document.querySelector(`#${cartaEscolhida[1].posicao.toString()}`).classList.add('opcao-correta');
                } else {
                    document.querySelector(`#${cartaEscolhida[0].posicao.toString()}`).classList.add('opcao-incorreta');
                    document.querySelector(`#${cartaEscolhida[1].posicao.toString()}`).classList.add('opcao-incorreta');
                };
                cartaEscolhida = [];
            };
        });
    });
};

//Renderiza as cartas no browser
function renderizarCartas() { 
    renderizarElementos();
    var colunas = document.querySelectorAll('.col');
    for(i = 0; i < cartas.length; i++) {
        colunas[i].id =  'col-'+i;
        colunas[i].classList.add('coluna-' + cartas[i].id);
        colunas[i].innerHTML = cartas[i].icone;
    };
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
    renderizarCartas();
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