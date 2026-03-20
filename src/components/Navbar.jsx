import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import Button from "@mui/material/Button";

const Navbar = () => {
  const { user } = useAuthContext();
  const Logout = useLogout();
  const handleLogout = () => {
    Logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout</h1>
        </Link>

        {!user ? (
          <nav className="routes">
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Login</Link>
          </nav>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
            }}
          >
            <span>{user.email}</span>
            <Link to="/" onClick={handleLogout}>
              <Button
                style={{ borderColor: "red", color: "red", fontWeight: "bold" }}
                variant="outlined"
              >
                Log out
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
