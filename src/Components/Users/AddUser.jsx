import {useState} from "react";
import {postAccount} from "../../api/userApi.js";

export default function AddUser() {
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
            setNotification("Пользователь успешно добавлен");
        } else {
            setNotification("Неверно введены данные");
        }
    };

    return (
        <div className="registration-container w-25 mt-5 m-auto">
            <form className="registration-form">
                <input name="username" className="form-control fs-5" type="text" placeholder="Логин" aria-label="default input example" onChange={handleChange} />
                <input name="password" className="form-control fs-5" type="password" placeholder="Пароль" aria-label="default input example" onChange={handleChange} />
                <input name="fullName" className="form-control fs-5" type="text" placeholder="ФИО" aria-label="default input example" onChange={handleChange} />
                <input name="birthDate" className="form-control fs-5" type="date" aria-label="default input example" onChange={handleChange} />
                <input name="email" className="form-control fs-5" type="email" placeholder="Почта" aria-label="default input example" onChange={handleChange} />
                <input name="phone" className="form-control fs-5" type="tel" placeholder="Телефон" aria-label="default input example" onChange={handleChange} />
                <pre className="fs-5" style={{fontFamily:  "Segoe UI"}}>{notification}</pre>
                <button type="button" className="btn btn-primary  fs-5" onClick={onClick}>Добавить пользователя</button>
            </form>
        </div>
    );
}