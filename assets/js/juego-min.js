const miModulo = (() => { let e = [],
        t = ["C", "H", "S", "D"],
        o = ["A", "J", "Q", "K"]; const l = document.querySelector("#btnPedir"),
        n = document.querySelector("#btnDetener"),
        r = document.querySelector("#btnNuevo"),
        c = document.querySelectorAll(".jg"),
        s = document.querySelectorAll("span"),
        d = document.querySelectorAll(".cartas"); let u = [],
        a = 0,
        g = 0;

    function h(t = 2) { for (e = p(), u = [], i = 0; i < t; i++) u.push(0);
        s.forEach(e => e.innerText = 0), d.forEach(e => e.innerHTML = ""), l.disabled = !1, n.disabled = !1 } let p = () => { e = []; for (let o = 2; o <= 10; o++)
                for (let l of t) e.push(o + l); for (let l of o)
                for (let o of t) e.push(l + o); return _.shuffle(e) },
        f = () => { if (0 === e.length) throw "No hay cartas, No se puede jugar"; return e.pop() }; const b = (e, t) => (u[t] += (e => { let t = e.substring(0, e.length - 1); return isNaN(t) ? t = "A" === t ? u[0] <= 10 || u[u.length - 1 <= 15] ? 11 : 1 : 10 : t *= 1, t })(e), s[t].style.color = "white", s[t].innerText = u[t], console.log(s[t]), console.log(u[t]), u[t]),
        m = (e, t) => { let o = document.createElement("img");
            o.src = `assets/cartas/${e}.png`, d[t].append(o) }; let y = e => { let t = 0;
        do { let e = f();
            console.log(e), t = b(e, u.length - 1), m(e, u.length - 1) } while (e <= 21 && t <= e && t <= 21 || t == e);! function(e, t) { setTimeout(() => { t === e || (e > 21 ? a += 1 : t > 21 ? g += 1 : a += 1), console.log({ jgc: a, jgu: g }), c[0].innerHTML = `Jugador <p>${g}</p>`, c[1].innerHTML = `Computadora <p>${a}</p>` }, 200) }(u[0], u[u.length - 1]) }; return l.addEventListener("click", () => { let e = f(),
            t = b(e, 0);
        console.log({ puntosJugador: t }), m(e, 0), t > 21 ? (l.disabled = !0, n.disabled = !0, y(t)) : 21 === t && (l.disabled = !0, n.disabled = !0, y(t)) }), n.addEventListener("click", () => { l.disabled = !0, n.disabled = !0, y(u[0]) }), r.addEventListener("click", () => { console.clear(), h() }), { nuevoJuego: h } })();