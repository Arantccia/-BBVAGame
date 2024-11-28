/* eslint-disable react/prop-types */
import { Navigate, Route, Routes } from "react-router-dom";


const NotFound = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/404" element={<h1>pagina no encontrada</h1>} />
    </Routes>
  );
};

export default NotFound;
