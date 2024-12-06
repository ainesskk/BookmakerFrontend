import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { setEditData} from "../../api/localStorageFunctions.js";
import { putUser } from "../../api/userApi.js";

export default function EditUser() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { userInfo } = state || {};
    const [notification, setNotification] = useState(" ");
    const [newData, setNewData] = useState({
        fullName: userInfo.fullName,
        birthDate: userInfo.birthDate,
        email: userInfo.email,
        phone: userInfo.phone
    });

    const handleChange = (event) => {
        setNewData({ ...newData, [event.target.name]: event.target.value });
    };

    const handleEditUserData = async (e) => {
        e.preventDefault();

        const requestData = {
            password: userInfo.password,
            fullName: newData.fullName,
            birthDate: newData.birthDate,
            email: newData.email,
            phone: newData.phone
        }

        const status = await putUser(requestData);
        if (status === 200) {
            await setEditData(requestData);
            navigate("/userpage");
        }
        else {
            setNotification("Возникла ошибка при редактировании")
        }
    };

    return (
        <>
            <div className="container mt-5 col-3 fs-5 d-flex justify-content-center">
                <form className="w-100" onSubmit={handleEditUserData}>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label w-100">ФИО</label>
                        <input
                            type="text"
                            className="form-control w-100"
                            id="fullName"
                            name="fullName"
                            value={newData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="birthDate" className="form-label">Дата рождения</label>
                        <input
                            type="date"
                            className="form-control"
                            id="birthDate"
                            name="birthDate"
                            value={newData.birthDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Почта</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={newData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Телефон</label>
                        <input
                            type="phone"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={newData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary fs-5">Подтвердить</button>
                    <p className="display-3 mt-3 fs-5">{notification}</p>
                </form>
            </div>
        </>
    );
}
