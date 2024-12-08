import "./Authorization.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUser, postAccountAuth} from "../../api/userApi.js";
import {setToken} from "../../api/localStorageFunctions.js";

export default function Login() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState(" ");
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const onClick = async (e) => {
        e.preventDefault();

        if(data.username.trim() === "" || data.password.trim() === "" ) {
            setNotification("Введите данные");
            return
        }

        const requestData = {
            username: data.username,
            password: data.password
        };

        console.log(requestData);


        const response = await postAccountAuth(requestData);
        if (response.data) {
            await setToken(response.data);
            await getUser();
            navigate("/userpage");
        }
        else if (response.status === 401) {
            setNotification("Неверный логин или пароль");
        }
    };
    return (
        <>
            <div className="login-container">
                <h2>Вход</h2>
                <form className="login-form">
                    <input name="username" className="form-control login" type="text" placeholder="Логин"
                           aria-label="default input example" onChange={handleChange}/>
                    <input name="password" className="form-control password" type="text" placeholder="Пароль"
                           aria-label="default input example" onChange={handleChange}/>
                    <pre className="fs-6" style={{fontFamily:  "Segoe UI"}}>{notification}</pre>
                    <button type="button" className="btn btn-primary login-button" onClick={onClick}>Войти</button>

                </form>
            </div>
        </>
    )
}