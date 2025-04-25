import { Outlet, Navigate } from "react-router";
import { useNavigate } from "react-router";

// Higher Order Component

function Layout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const isAuthenticated = !!localStorage.getItem("token"); // adapte à ton besoin



  return isAuthenticated ? (
    <div>
      <h1>PokeDex Header</h1>
      <button onClick={handleLogout}>Logout</button>
      <main>
        <Outlet />
      </main>
      <h2>PokeDex Footer</h2>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default Layout;
