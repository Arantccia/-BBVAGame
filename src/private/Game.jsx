import { useEffect, useState } from "react";

const Game = () => {
  const nombre = localStorage.getItem("name") || "Jugador";
  const [dificultad, setDificultad] = useState("bajo");
  const [puntos, setPuntos] = useState(0);
  const [tablero, setTablero] = useState([]);
  const [numeroBuscado, setNumeroBuscado] = useState(null);
  const [showNumbers, setShowNumbers] = useState(false);

 
  const tiempos = { bajo: 10000, medio: 5000, alto: 2000 };
  const puntosPorNivel = { bajo: 10, medio: 20, alto: 30 };


  // Función para generar un arreglo de números aleatorios entre 1 y 9
  const giveMeRandomNumber = () => {
    const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
    }
    return numbers;
  };

  const startGame = () => {
    setTablero((previusCards) => {
      if (previusCards.length) return [];
      return giveMeRandomNumber();
    });
    setNumeroBuscado(() => 0);
    setShowNumbers(false);
    const numberCards = giveMeRandomNumber();
    setNumeroBuscado(() => numberCards[Math.floor(Math.random() * 9)]);
    setShowNumbers(true);
    setTimeout(() => setShowNumbers(false), tiempos[dificultad]);
  };



  const handleSeleccion = (numero) => {
    if (numero === numeroBuscado) {
      setPuntos((prevPuntos) => prevPuntos + puntosPorNivel[dificultad]);
    /*  startGame(); */
    } else {
      alert(`¡Has fallado! Tu puntuación final es: ${puntos}`);
      setPuntos(0);
      setTablero([]);
    }
  };

  return (
    <div>
      {/* todo: pasar a un componente navbar crear contexto */}
      <nav className="navbar">
        <div className="navbar-grid">
          <div className="navbar-name">{nombre}</div>
          <div className="navbar-select">
            <label htmlFor="">label:</label>
            <select
              value={dificultad}
              onChange={(e) => setDificultad(e.target.value)}
            >
              <option value="bajo">Bajo</option>
              <option value="medio">Medio</option>
              <option value="alto">Alto</option>
            </select>
          </div>
        </div>
      </nav>

      <h1 className="points">Points: {puntos}</h1>
      {tablero.length ? (
        <h3>¿ where is the number: {numeroBuscado} ?</h3>
      ) : (
        <h3>Memorize the cardas</h3>
      )}
      <div>
        <div className="card-grid">
          {tablero.map((numero, i) => (
            <div
              key={numero + i}
              className="card"
              onClick={() => handleSeleccion(numero)}
            >
              <p>{showNumbers ? numero : "?"}</p>
            </div>
          ))}
        </div>
        <button onClick={startGame}>Iniciar juego</button>
      </div>
    </div>
  );
};

export default Game;
