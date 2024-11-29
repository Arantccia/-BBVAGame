import { useState, useRef, useEffect } from "react";
import StandarCard from "./components/StandarCard";

const Game = () => {
  const nombre = localStorage.getItem("name") || "Jugador";
  const initialPoints = localStorage.getItem("point") || 0;
  const [difficulty, setDifficulty] = useState("bajo");
  const [points, setPoints] = useState(initialPoints);
  const [board, setBoard] = useState([]);
  const [targetNumber, setTargetNumber] = useState(null);
  const [showNumbers, setShowNumbers] = useState(false);
/*   const [changeQuestion, setChangeQuestion] = useState(false); */
  const [cardStatuses, setCardStatuses] = useState({});

  const tiempos = { bajo: 10000, medio: 5000, alto: 2000 };
  const puntosPorNivel = { bajo: 10, medio: 20, alto: 30 };

  const timeoutRef = useRef(null);

  const clearExistingTimeouts = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearExistingTimeouts();
    };
  }, [difficulty]);

  const giveMeRandomNumber = () => {
    const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
    }
    return numbers;
  };

  const startGame = () => {
    clearExistingTimeouts();
    const newBoard = giveMeRandomNumber();
    const newtarget = newBoard[Math.floor(Math.random() * 9)];
    setBoard(() => newBoard);
    setTargetNumber(newtarget);
    setShowNumbers(true);
    setCardStatuses({});
    timeoutRef.current = setTimeout(
      () => setShowNumbers(false),
      tiempos[difficulty]
    );
  };

  const handleSeleccion = (numero, i) => {
    clearExistingTimeouts();
    const isCorrect = numero === targetNumber;

    setCardStatuses((prev) => ({
      ...prev,
      [i]: isCorrect ? "card-correct" : "card-incorrect",
    }));

    if (isCorrect) {
      setPoints((prev) => prev + puntosPorNivel[difficulty]);
      timeoutRef.current = setTimeout(startGame, 2000);
    } else {
      setPoints(0);
      timeoutRef.current = setTimeout(() => setBoard([]), 2000);
    }
  };
  //TODO: cambiar por el componente cardMap
  const handleShowNumbers = () => {
    return board?.map((item, i) => {
      let displayValue = showNumbers ? item : "?";
      let cardClass = "card";

      if (cardStatuses[i]) {
        cardClass = `card ${cardStatuses[i]}`;
        displayValue = item
      }

      return (
        <StandarCard
          key={item}
          itemCard={displayValue}
          onClick={() => handleSeleccion(item, i)}
          classCard={cardClass}
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
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
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
      <h1 className="points">Points: {points}</h1>
      {board.length ? (
        <h3>¿ where is the number: {targetNumber} ?</h3>
      ) : (
        <h3>Memorize the cardas</h3>
      )}
      <div>
        {/* todo: cambiar por el componente card */}
        <div className="card-grid">{handleShowNumbers()}</div>
       <button onClick={startGame}>
          {board.length <= 0 ? "play" : "continue"}
        </button>
        
      </div>
    </div>
  );
};

export default Game;
