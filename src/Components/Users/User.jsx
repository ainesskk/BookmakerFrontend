import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRole} from "../../api/localStorageFunctions.js";

export default function User({user}) {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [rusRole, setRusRole] = useState("");
    const roles = {
        Admin: "Администратор",
        Worker: "Работник",
        User: "Пользователь"
    }

    useEffect(() => {
        setRusRole(roles[user.role]);
        const role = localStorage.getItem("role");
        if(role === "Admin") setIsAdmin(true);
    }, [])

    const handleClick = () => {
        navigate("/userdetails", { state: { user } });
    }

    return (
        <>
            {
                isAdmin ?
                    <button key={user.id} className="card mb-3 mt-3 btn btn-light w-100" onClick={handleClick}>
                        <div className="card-body d-flex justify-content-evenly align-items-center w-100">
                            <p className="card-text fs-5 m-0 w-25 text-center">{user.username}</p>
                            <p className="card-text fs-5 m-0 w-50 text-center">{user.fullName}</p>
                            <p className="card-text fs-5 m-0 w-25 text-center">{rusRole}</p>
                        </div>
                    </button> :
                    (user.role !== "Admin" && user.role !== "Worker") &&
                    <button key={user.id} className="card mb-3 mt-3 btn btn-light w-100" onClick={handleClick}>
                        <div className="card-body d-flex justify-content-evenly align-items-center w-100">
                            <p className="card-text fs-5 m-0 w-25 text-center">{user.username}</p>
                            <p className="card-text fs-5 m-0 w-50 text-center">{user.fullName}</p>
                        </div>
                    </button>
            }

        </>
    )
}