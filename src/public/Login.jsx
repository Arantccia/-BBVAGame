import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { AppRoutes } from "../AppRouter";

const initialForm = {
  name: "",
  password: "",
};
const Login = () => {
  const { formState, onInputChange, onResetForm } = useForm(initialForm);
  const navigate = useNavigate();

  const hanleFotrmSubmit = () => {
    const { name, password } = formState;

    //todo: logic to send data & validatións login
    console.log(name, password);
    localStorage.setItem("token", true);
    onResetForm();
    navigate(`${AppRoutes.private.root}`);
  };

  return (
    <>
      <input
        type="text"
        name="name"
        value={formState.name}
        onChange={onInputChange}
      />
      <input
        type="password"
        name="password"
        value={formState.password}
        onChange={onInputChange}
      />
      <button type="button" onClick={hanleFotrmSubmit}>
        Start
      </button>
    </>
  );
};

export default Login;
