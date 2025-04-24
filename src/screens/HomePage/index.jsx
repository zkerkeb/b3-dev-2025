import Counter from "../../components/Counter";
import { Link, useNavigate } from "react-router";

const HomePage = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    }

    return <div>
        <button onClick={goToLogin}>Login</button>
        <Link to="/login">Login</Link>
        <Counter />

    </div>;
  };

export default HomePage;