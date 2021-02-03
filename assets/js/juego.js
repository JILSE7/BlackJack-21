//COMPARALO CON EL PRIMERO PARA QUE NOTES LAS DIFERENCIA


//PATRON MODULO
const miModulo = (() => { //ESTO ES UNA IIFE, FUNCION INVOCADA INMEDIATAMENTE Y SE USA EN EL PATRON MODULO
    let deck = [],
        tipos = ['C', 'H', 'S', 'D'],
        speciales = ['A', 'J', 'Q', 'K'];

    //SELECTORES DEL JUEGO
    const pedir = document.querySelector('#btnPedir'),
        detener = document.querySelector('#btnDetener'),
        Nuevo = document.querySelector('#btnNuevo'),
        juegosGanados = document.querySelectorAll('.jg'),

        marcadores = document.querySelectorAll('span'),
        divCartasJugadores = document.querySelectorAll('.cartas');



    let puntosJugadores = [];
    let jgc = 0,
        jgu = 0;


    /* 1) INICIALIZACION DEL JUEGO  1 */
    //borramos la creacion del deck que estaba por ahi en la nada y la ponemos en una funcion
    function startGame(numeroJugadores = 2) {
        deck = crearDeck(); //CREACION DEL DECK
        puntosJugadores = [];
        for (i = 0; i < numeroJugadores; i++) {
            puntosJugadores.push(0);
        }

        marcadores.forEach(elemento => elemento.innerText = 0)
        divCartasJugadores.forEach(elemento => elemento.innerHTML = '')
        pedir.disabled = false;
        detener.disabled = false;

    }

    /* --------------------------------------------------------------------------------------------- */
    let crearDeck = () => {
        deck = []; // 2)  ESTE RESETEO SE PONE PARA CUANDO SE CREE EL DECK SIEMPRE EMPIEZE VACIO
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo)
            }
        }

        for (let sp of speciales) {
            for (let tipo of tipos) {
                deck.push(sp + tipo)
            }
        }
        return _.shuffle(deck);
    }


    /* -------------------*------------------------------------------------------------------------- */
    // 3) AQUI LA VARIABLE CARTA ESTA DE MAS PUES LA TIENES DECLARADA 2 VECES PERO EN OTRO FUNCION

    let pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas, No se puede jugar'
        }
        // const carta = deck.pop();
        // return carta;
        return deck.pop();
    }

    /* -------------------------------------------------------------------------------------------- */
    //VALOR DE LA CARTA
    let valorCarta = (carta) => {
        let valor = carta.substring(0, carta.length - 1);

        if (isNaN(valor)) {
            if (valor === 'A') {
                if ((puntosJugadores[0] <= 10 || puntosJugadores[puntosJugadores.length - 1 <= 15])) {
                    valor = 11;
                } else {
                    valor = 1;
                }

            } else {
                valor = 10;
            }
        } else {
            valor = valor * 1;
        }
        return valor;

    }

    //TURNO 0 = PRIMER JUGADOR Y EL ULTIMO SERA LA COMPUTADORA
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);


        //COMPUTADORA
        marcadores[turno].style.color = 'white';
        marcadores[turno].innerText = puntosJugadores[turno];
        console.log(marcadores[turno]);
        console.log(puntosJugadores[turno]);
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        let img = document.createElement('img');
        img.src = `assets/cartas/${carta}.png`;
        divCartasJugadores[turno].append(img);


    }

    function Ganador(puntosA, puntosB) {

        setTimeout(() => {
            if (puntosB === puntosA) {

            } else if (puntosA > 21) {

                jgc += 1;
            } else if (puntosB > 21) {

                jgu += 1;
            } else {

                jgc += 1;

            }
            console.log({ jgc, jgu });
            juegosGanados[0].innerHTML = `Jugador <p>${jgu}</p>`;
            juegosGanados[1].innerHTML = `Computadora <p>${jgc}</p>`;

        }, 200);


    }

    /* --------------------------------------------------------------------------------------------- */
    //LOGICA COMPUTADORA
    let logicaComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            let carta = pedirCarta();
            console.log(carta);
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1)

        } while ((puntosMinimos <= 21) && (puntosComputadora <= puntosMinimos) && (puntosComputadora <= 21) || puntosComputadora == puntosMinimos);
        Ganador(puntosJugadores[0], puntosJugadores[puntosJugadores.length - 1])
    };



    pedir.addEventListener('click', () => {

        let carta = pedirCarta();
        let puntosJugador = acumularPuntos(carta, 0);
        console.log({ puntosJugador });
        crearCarta(carta, 0);


        //CONDICION DE 21
        if (puntosJugador > 21) {
            pedir.disabled = true;
            detener.disabled = true;
            logicaComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            pedir.disabled = true;
            detener.disabled = true;
            logicaComputadora(puntosJugador);
        }

    });


    //BOTON DETENER
    detener.addEventListener('click', () => {

        pedir.disabled = true;
        detener.disabled = true;
        logicaComputadora(puntosJugadores[0]);


    });


    //BOTON NUEVO JUEGO
    Nuevo.addEventListener('click', () => {
        console.clear();
        startGame();
    });

    return {
        nuevoJuego: startGame
    }
})();