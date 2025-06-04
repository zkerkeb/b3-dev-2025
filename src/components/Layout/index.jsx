import { Outlet, Navigate } from "react-router";
import { useNavigate } from "react-router";
import ThemeToggle from "../ThemeToggle";
import './index.css';

// Higher Order Component

function Layout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const isAuthenticated = !!localStorage.getItem("token"); // adapte à ton besoin

  return isAuthenticated ? (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <h1 className="app-title">PokeDex</h1>
          <div className="header-controls">

            <ThemeToggle />
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <p>&copy; 2024 PokeDex - Tous droits réservés</p>
      </footer>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default Layout;
