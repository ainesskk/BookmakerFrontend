import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { postUserRole } from "../../api/userApi.js";

export default function EditUserRole() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { userInfo } = state || {};
    const [notification, setNotification] = useState("");
    const [newRole, setNewRole] = useState(userInfo.role || "User");

    const handleChangeSelect = (e) => {
        setNewRole(e.target.value);
    };

    const handleEditUserData = async (e) => {
        e.preventDefault();

        const requestData = {
            role: newRole
        }

        try {
            const status = await postUserRole(userInfo.username, requestData);
            if (status === 200) {
                navigate(-1);
            } else {
                setNotification("Возникла ошибка при редактировании");
            }
        } catch (error) {
            setNotification("Возникла ошибка при редактировании");
            console.error("Response error: ", error);
        }
    };

    return (
        <>
            <form className="w-25 m-auto mt-5" onSubmit={handleEditUserData}>
                <div className="">
                    <h4 className="mb-4">Выберите новую роль</h4>
                    <select className="form-select fs-5 mb-4" value={newRole} onChange={handleChangeSelect}>
                        <option value="User">Пользователь</option>
                        <option value="Worker">Работник</option>
                        <option value="Admin">Администратор</option>
                    </select>
                    <button type="submit" className="btn btn-primary fs-5">Подтвердить</button>
                </div>
                <p className="display-3 mt-3 fs-5">{notification}</p>
            </form>
        </>
    );
}
