import { lazy } from "react";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import Login from "./public/Login";
import NotFound from "./components/NotFound";
import { PrivateGuard } from "./guards/PrivateGuard";
import { PrivateRoutes } from "./private/PrivateRoutes"; 






export const AppRoutes = {
  login: "/login",

  private: {
    root: "/private",
    game: {
        root: "/game",
        component: lazy(() => import("./private/Game"))
    },
  },
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <NotFound>
        <Route path="/" element={<Navigate to={AppRoutes.login} />} />
        <Route path={AppRoutes.login} element={<Login />} />     
        <Route element={<PrivateGuard />}>
          <Route
            path={`${AppRoutes.private.root}/*`}
            element={<PrivateRoutes />}
          />
        </Route>
      </NotFound>
    </BrowserRouter>
  );
};
