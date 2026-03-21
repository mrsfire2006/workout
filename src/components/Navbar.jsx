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
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: "rgba(26, 172, 131, 0.1)",
                padding: "6px 12px",
                borderRadius: "6px",
                color: "var(--primary)",
                fontWeight: "500",
                fontSize: "0.9em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "150px",
              }}
            >
              {user.email}
            </span>
            <Link to="/" onClick={handleLogout} style={{ margin: 0 }}>
              <Button
                style={{
                  borderColor: "var(--error)",
                  color: "#fff",
                  fontWeight: "700",
                  padding: "6px 16px",
                  background: "linear-gradient(135deg, var(--error), #c0392b)",
                  textTransform: "none",
                  fontSize: "0.9em",
                  minWidth: "auto",
                }}
                variant="contained"
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
