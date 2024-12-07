import "./Authorization.css";
import { useState } from "react";
import {getUser, postAccount, postAccountAuth} from "../../api/userApi.js";
import { getToken, setToken } from "../../api/localStorageFunctions.js";
import {useNavigate} from "react-router-dom";

export default function Registration() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState(" ");
    const [data, setData] = useState({
        username: "",
        password: "",
        fullName: "",
        birthDate: "",
        email: "",
        phone: ""
    });

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const onClick = async (e) => {
        e.preventDefault();

        const requestData = {
            username: data.username,
            password: data.password,
            fullName: data.fullName,
            birthDate: data.birthDate,
            email: data.email,
            phone: data.phone
        };

        console.log(requestData);

        const registerStatus = await postAccount(requestData);
        if (registerStatus === 201) {
            const token = await postAccountAuth({ username: data.username, password: data.password });
            await setToken(token);
            await getUser();
            navigate("/userpage");
        } else {
            setNotification("Неверно введены данные");
        }
    };

    return (
        <div className="registration-container">
            <h2>Регистрация</h2>
            <form className="registration-form">
                <input name="username" className="form-control" type="text" placeholder="Логин" aria-label="default input example" onChange={handleChange} />
                <input name="password" className="form-control" type="password" placeholder="Пароль" aria-label="default input example" onChange={handleChange} />
                <input name="fullName" className="form-control" type="text" placeholder="ФИО" aria-label="default input example" onChange={handleChange} />
                <input name="birthDate" className="form-control" type="date" aria-label="default input example" onChange={handleChange} />
                <input name="email" className="form-control" type="email" placeholder="Почта" aria-label="default input example" onChange={handleChange} />
                <input name="phone" className="form-control" type="tel" placeholder="Телефон" aria-label="default input example" onChange={handleChange} />
                <pre>{notification}</pre>
                <button type="button" className="btn btn-primary" onClick={onClick}>Зарегистрироваться</button>
            </form>
        </div>
    );
}
