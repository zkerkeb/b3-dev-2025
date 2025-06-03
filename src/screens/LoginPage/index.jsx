import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("admin");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/pokemon");
        }
    }, [])

    const handleLogin = () => {
        console.log("login", username, password);
        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

        axios({
            method: "POST",
            url: "http://localhost:3000/api/login",
            data: {
                username,
                password
            }
        }).then(async(res) => {
            console.log(res);
            await localStorage.setItem("token", res.data.token);
            navigate("/pokemon");
        }).catch((err) => {
            console.log(err);
            alert("Invalid username or password");
        })


    }

    return <div>
        <Link to="/">Home</Link>
        <div>
            <input value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text" placeholder="Username" />
            <input value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>

    </div>;
};

export default LoginPage;