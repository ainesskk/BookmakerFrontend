import {NavLink} from 'react-router-dom';

export default function Navbar() {

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
                            <li className="nav-item me-4 ms-4">
                                <NavLink
                                    to="/events"
                                    className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                                >
                                    События
                                </NavLink>
                            </li>
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
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}