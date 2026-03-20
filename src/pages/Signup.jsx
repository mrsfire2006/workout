import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

import Loading from "../components/Loading";

const Signup = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(user.email, user.password);
  };

  return (
    <>
      <Loading  isloading={isLoading} />

      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign up</h3>
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
          Signup
        </button>
        {error && (
          <div className="error">
            {error.email || error.password || error.message}
          </div>
        )}
      </form>
    </>
  );
};
export default Signup;
