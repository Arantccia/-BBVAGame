import { useState } from "react";
import StandarCard from "./components/StandarCard";

const Game = () => {
  const nombre = localStorage.getItem("name") || "Jugador";
  const [dificultad, setDificultad] = useState("bajo");
  const [puntos, setPuntos] = useState(0);
  const [tablero, setTablero] = useState([]);
  const [numeroBuscado, setNumeroBuscado] = useState(null);
  const [showNumbers, setShowNumbers] = useState(false);
  const [changeQuestion, setChangeQuestion] = useState(false);
  const [classCard, setClassCard] = useState('')

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
    setTablero(() => giveMeRandomNumber());
    setNumeroBuscado(() => 0);
    setShowNumbers(false);
    setChangeQuestion(false);
    const numberCards = giveMeRandomNumber();
    setNumeroBuscado(() => numberCards[Math.floor(Math.random() * 9)]);
    setShowNumbers(true);
    setTimeout(() => setShowNumbers(false), tiempos[dificultad]);
  };

  const handleSeleccion = (numero) => {
    if (numero === numeroBuscado) {
      setChangeQuestion(true);
      setPuntos(puntos + puntosPorNivel[dificultad]);
      setClassCard('card-correct')
    } else {
      setClassCard('card-incorrect')
      setChangeQuestion(true);
      setPuntos(0);
      setTimeout(() => setTablero([]), 2000);
    }
  };
  //TODO: cambiar por el componente cardMap
  const handleShowNumbers = () => {
    return tablero?.map((item) => {
      let itemCard = item;
      if (!showNumbers) {
        itemCard = "?";
      }
      if (!showNumbers && item === numeroBuscado && changeQuestion) {
        itemCard = item;
      }
      return (
        <StandarCard
          key={item}
          itemCard={itemCard}
          onClick={() => handleSeleccion(item)}
          classCard={classCard}
        />
      );
    });
  };

  //TODO: cambiar por el componente navbar
  const handleNavbar = () => (
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
  );
  return (
    <div>
      {handleNavbar()}
      <h1 className="points">Points: {puntos}</h1>
      {tablero.length ? (
        <h3>¿ where is the number: {numeroBuscado} ?</h3>
      ) : (
        <h3>Memorize the cardas</h3>
      )}
      <div>
        {/* todo: cambiar por el componente card */}
        <div className="card-grid">{handleShowNumbers()}</div>
        <button onClick={startGame}>
          {tablero.length <= 0 ? "play" : "continue"}
        </button>
      </div>
    </div>
  );
};

export default Game;
