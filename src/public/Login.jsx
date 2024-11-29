import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { AppRoutes } from "../AppRouter";

const initialForm = {
  name: "",
};
const Login = () => {
  const { formState, onInputChange, onResetForm } = useForm(initialForm);
  const navigate = useNavigate();

  const hanleFotrmSubmit = () => {
    const { name } = formState;
    //todo: logic to send data & validatións login
    if (!name) return;
    if (name !== ""  && name.length > 2) {
      console.log("if", name);
      localStorage.setItem("token", true);
      localStorage.setItem("name", name);
      onResetForm();
      navigate(`${AppRoutes.private.root}`);
    }
  };

  return (
    <div className="card">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formState.name}
        onChange={onInputChange}
      />

      <button type="button" onClick={hanleFotrmSubmit}>
        Start
      </button>
    </div>
  );
};

export default Login;
