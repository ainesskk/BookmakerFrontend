import { useEffect, useState } from "react";
import { getData } from "../../api/localStorageFunctions.js";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(() => {
        const savedUserInfo = localStorage.getItem('userData');
        return savedUserInfo ? JSON.parse(savedUserInfo) : {};
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getData();
            setUserInfo(userData);
            localStorage.setItem('userData', JSON.stringify(userData));
        };

        if (!userInfo || Object.keys(userInfo).length === 0) {
            fetchUserData();
        }
    }, [userInfo]);

    const logOut = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        sessionStorage.clear()
        navigate('/login');
    };

    const editUser = () => {
        navigate('/edituser', { state: { userInfo } });
    };

    const handleEditBalance = (e) => {
        const transactionType = e.currentTarget.name;
        navigate('/changebalance', { state: { transactionType } });
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-3 w-50">
                <div className="d-flex fs-5 align-items-center user-page-container">
                    <div className="ml-3 w-100 user-page">
                        <h3 className="mb-0 mt-0">{userInfo.fullName}</h3>
                        <p>{userInfo.role}</p>
                        <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                            <div className="d-flex flex-column">
                                <span className="balance">Баланс</span>
                                <span className="number1">{userInfo.balance}</span>
                            </div>
                        </div>
                        <div className="button mt-2 d-flex flex-row align-items-center">
                            <button name="deposit" className="btn btn-sm me-3 btn-outline-primary w-80" onClick={handleEditBalance}>
                                <p className="fs-5 mb-0 p-1">Пополнение</p>
                            </button>
                            <button name="withdrawal" className="btn btn-sm btn-outline-primary w-80" onClick={handleEditBalance}>
                                <p className="fs-5 mb-0 p-1">Вывод</p>
                            </button>
                        </div>
                        <p className="mt-3 mb-1">Телефон: {userInfo.phone}</p>
                        <p className="mb-0">Почта: {userInfo.email}</p>
                        <p className="mt-1 mb-3">Дата рождения: {userInfo.birthDate}</p>
                        <div className="button mt-2 d-flex flex-row align-items-center justify-content-evenly">
                            <button className="btn btn-sm btn-outline-primary w-50" onClick={editUser}>
                                <p className="fs-5 mb-0 p-1">Редактировать</p>
                            </button>
                            <button className="btn btn-sm btn-outline-secondary w-25" onClick={logOut}>
                                <p className="fs-5 mb-0 п-1">Выйти</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
