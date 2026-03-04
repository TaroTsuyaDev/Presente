const jardim = document.getElementById('jardim');
const textoInicial = document.getElementById('texto-inicial');
const pedido = document.getElementById('pedido');
const btnNao = document.getElementById('btn-nao'); // Pegamos o botão Não

const tipoFlores = ['🌸', '🌺', '🌻', '🌷'];

let floresPlantadas = 0;
const limiteFlores = 200; 

function plantarFlor(x, y) {
    // REMOVIDO a trava que parava as flores. Agora elas são infinitas!

    const novaFlor = document.createElement('div');
    const florSorteada = tipoFlores[Math.floor(Math.random() * tipoFlores.length)];
    
    novaFlor.innerText = florSorteada;
    novaFlor.classList.add('flor'); 
    
    novaFlor.style.left = x + 'px';
    novaFlor.style.top = y + 'px';
    
    const rotacao = Math.random() * 360;
    novaFlor.style.setProperty('--rotacao', `${rotacao}deg`);

    jardim.appendChild(novaFlor);
    floresPlantadas++;

    // Muda de ">=" para "===" para o pedido aparecer EXATAMENTE na flor 50, e não tentar abrir de novo
    if (floresPlantadas === limiteFlores) {
        revelarPedido();
    }

    // Proteção de memória: apaga as flores antigas se passarem de 150
    const todasAsFlores = document.querySelectorAll('.flor');
    if (todasAsFlores.length > 150) {
        todasAsFlores[0].remove();
    }
}

function revelarPedido() {
    jardim.classList.add('jardim-florido');
    textoInicial.style.opacity = '0';
    
    setTimeout(() => {
        textoInicial.classList.add('escondido');
        pedido.classList.remove('escondido');
    }, 1000); 
}

// --- LÓGICA DO BOTÃO FUJÃO ("NÃO") ---
function sumirBotao() {
    // Tira a visibilidade e impede que ele seja clicado na tela
    btnNao.style.opacity = '0';
    btnNao.style.pointerEvents = 'none';
}

// Para PC: Se o mouse passar por cima, ele some
btnNao.addEventListener('mouseover', sumirBotao);

// Para Celular: Se o dedo relar nele, ele some antes do clique
btnNao.addEventListener('touchstart', (evento) => {
    evento.preventDefault(); // Impede o clique de registrar
    sumirBotao();
});

// --- CONTROLES PARA PC (Mouse) ---
let mousePressionado = false;

jardim.addEventListener('mousedown', (evento) => {
    mousePressionado = true;
    plantarFlor(evento.clientX, evento.clientY);
});

jardim.addEventListener('mouseup', () => {
    mousePressionado = false;
});

jardim.addEventListener('mousemove', (evento) => {
    if (mousePressionado) {
        plantarFlor(evento.clientX, evento.clientY);
    }
});

// --- CONTROLES PARA CELULAR (Toque) ---
jardim.addEventListener('touchmove', (evento) => {
    const toque = evento.touches[0]; 
    plantarFlor(toque.clientX, toque.clientY);
});

// --- AÇÕES DOS BOTÕES FINAIS ---
document.getElementById('btn-sim').addEventListener('click', () => {
    alert('Ela disse SIM! O duo tá formado!');
});

document.getElementById('btn-obvio').addEventListener('click', () => {
    alert('Ela disse COM CERTEZA! Sucesso total!');

});

