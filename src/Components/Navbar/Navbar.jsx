import {NavLink} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import {getRole} from "../../api/localStorageFunctions.js";

export default function Navbar() {
    const [role, setRole] = useState("")

    useEffect(() => {
        const fetchRole = async () => {
            const userRole = await getRole()
            setRole(userRole);
        }

        fetchRole();
    }, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav fs-5">
                            <li className="nav-item me-4 ms-4">
                                <NavLink
                                    to="/userpage"
                                    className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                                >
                                    Личный кабинет
                                </NavLink>
                            </li>
                            { (role === "User" || role === "Worker") &&
                                <li className="nav-item me-4 ms-4">
                                    <NavLink
                                        to="/events"
                                        className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                                    >
                                        События
                                    </NavLink>
                                </li>
                            }
                            { role === "User" &&
                                <>
                                    <li className="nav-item me-4 ms-4">
                                        <NavLink
                                            to="/bets"
                                            className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                                        >
                                            Ставки
                                        </NavLink>
                                    </li>
                                    <li className="nav-item me-4 ms-4">
                                        <NavLink
                                            to="/transactions"
                                            className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                                        >
                                            Транзакции
                                        </NavLink>
                                    </li>
                                </>
                            }
                            {
                                (role === "Admin" || role === "Worker") &&
                                <>
                                    <li className="nav-item me-4 ms-4">
                                        <NavLink
                                            to="/users"
                                            className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                                        >
                                            Пользователи
                                        </NavLink>
                                    </li>
                                </>
                            }
                            {
                                role === "Worker" &&
                                <>
                                    <li className="nav-item me-4 ms-4">
                                        <NavLink
                                            to="/teams"
                                            className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                                        >
                                            Команды
                                        </NavLink>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}