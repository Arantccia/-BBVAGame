import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Game = () => {
  const location = useLocation();
  const nombre = location.state?.nombre || "Jugador";
  const [dificultad, setDificultad] = useState("bajo");
  const [numberPlayed, setNumberPlayed] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [tablero, setTablero] = useState([]);
  const [numeroBuscado, setNumeroBuscado] = useState(null);
  const [mostrarNumeros, setMostrarNumeros] = useState(true);
  const [time, setTime] = useState(10)

  const tiempos = { bajo: 10000, medio: 5000, alto: 2000 };
  const puntosPorNivel = { bajo: 10, medio: 20, alto: 30 };

  useEffect(() => {
    const levels = { low: 10, medium: 5, high: 2 };
    setTime(levels[dificultad]);
  }, [dificultad]);  
  const generarTablero = () => {
    const numeros = [...Array(9).keys()].map((n) => n + 1).sort(() => Math.random() - 0.5);
    setTablero(numeros);
    setNumeroBuscado(numeros[Math.floor(Math.random() * 9)]);
    setMostrarNumeros(true);

    setTimeout(() => setMostrarNumeros(false), tiempos[dificultad]);
  };

  function getRandomNumber() {
    return Math.ceil(Math.random() * 9);
  }
  const startGame = () => {
    const numberplayed = getRandomNumber();
    setNumberPlayed(numberplayed);
    generarTablero();
  };
 

  const handleSeleccion = (numero) => {

    if (numero === numberPlayed) {
      setPuntos(puntos + puntosPorNivel[dificultad]);
    } else {
      alert(`¡Has fallado! Tu puntuación final es: ${puntos}`);
      setPuntos(0);
    }
  };

  return (
    <div className="game">
      <h1>Memory Cards</h1>
      <p>Jugador: {nombre}</p>
      <p>Numero de Juego {numberPlayed}</p>
      <p>Puntos: {puntos}</p>
      <div>
        <label>
          Nivel de dificultad:
          <select
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
          >
            <option value="bajo">Bajo</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
          </select>
        </label>
        <div className="card-grid">
        {tablero.map((numero, i) => (
           <div key={numero + i} className="card" onClick={() => handleSeleccion(numero)}>
           <p>{mostrarNumeros ? numero : "?"}</p>
         </div>
        ))}
      </div>
        <button onClick={/* generarTablero */ startGame}>Iniciar juego</button>
      </div>

 
    </div>
  );
};

export default Game;
