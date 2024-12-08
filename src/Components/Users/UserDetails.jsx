import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {getUser, getUserLogin} from "../../api/userApi.js";

export default function UserDetails() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { user } = state || {};
    const [userInfo, setUserInfo] = useState(user);
    const [rusRole, setRusRole] = useState("");
    const roles = {
        Admin: "Администратор",
        Worker: "Работник",
        User: "Пользователь"
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserLogin(user.username);
            setUserInfo(data);
        };

        fetchData();

        setRusRole(roles[userInfo.role]);
    }, [userInfo]);

    const editUser = () => {
        navigate("/edituserdetails", { state: { userInfo } });
    };

    return (
        <>
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card p-3 w-50">
                    <div className="d-flex fs-5 align-items-center user-page-container">
                        <div className="ml-3 w-100 user-page">
                            <h3 className="mb-0 mt-0">{userInfo.fullName}</h3>
                            <p>{rusRole}</p>
                            <p className="mt-3 mb-1">Телефон: {userInfo.phone}</p>
                            <p className="mb-0">Почта: {userInfo.email}</p>
                            <p className="mt-1 mb-3">Дата рождения: {userInfo.birthDate}</p>
                            <div className="button mt-2 d-flex flex-row align-items-center justify-content-evenly">
                                <button className="btn btn-sm btn-outline-primary w-50" onClick={editUser}>
                                    <p className="fs-5 mb-0 p-1">Редактировать</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
