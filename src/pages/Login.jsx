import { useState } from "react";
import { useLogin } from "../hooks/userLogin";
import Loading from "../components/Loading";
const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(user.email, user.password);
  };

  return (
    <>
      <Loading isloading={isLoading} />
      <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <button disabled={isLoading} type="submit">
          Login
        </button>
      {error && (
        <div className="error">
          {error.email || error.password || error.message }
        </div>
      )}
      </form>
    </>
  );
};
export default Login;
