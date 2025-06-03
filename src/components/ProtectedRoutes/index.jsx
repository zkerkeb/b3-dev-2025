import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
    const isAuthenticated = localStorage.getItem("token")


    return isAuthenticated ?
        <div>
            <h1>ProtectedRoutes</h1>
            <Outlet />
            <h2>FIN DE LA PROTECTION</h2>
        </div>
        : <Navigate to="/login" />
}

export default ProtectedRoutes;