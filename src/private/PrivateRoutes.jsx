import { Navigate, Route } from "react-router-dom";
import { AppRoutes } from "../AppRouter";
import NotFound from "../components/NotFound.jsx";




export const PrivateRoutes = () => {
    
    const Game = AppRoutes.private.game.component
    
  return (
    <NotFound>
      <Route exact path="/" element={<Navigate to='game' />}  />
      <Route path={AppRoutes.private.game.root} element={<Game />} />
    </NotFound>
  );
};
