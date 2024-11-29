/* eslint-disable react/prop-types */
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../public/login";


const NotFound = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default NotFound;
