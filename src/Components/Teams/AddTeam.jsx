import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {postTeam} from "../../api/teamApi.js";

export default function AddTeam() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { team } = state || {};
    const [notification, setNotification] = useState(" ");
    const [newTeam, setNewTeam] = useState({
        name: "",
        sport: "",
        country: ""
    });

    const handleChange = (event) => {
        setNewTeam({ ...newTeam, [event.target.name]: event.target.value });
    };

    const handleEditTeam = async (e) => {
        e.preventDefault();

        const requestData = {
            name: newTeam.name,
            sport: newTeam.sport,
            country: newTeam.country
        };

        console.log("Request Data:", requestData);
        const status = await postTeam(requestData);
        console.log("Request Data:", status);
        if (status === 204) {
            navigate(-1);
        } else {
            setNotification("Возникла ошибка при создании");
        }
    };

    return (
        <>
            <div className="container mt-5 col-3 fs-5 d-flex justify-content-center">
                <form className="w-100" onSubmit={handleEditTeam}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Название команды</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={newTeam.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sport" className="form-label">Вид спорта</label>
                        <input
                            type="text"
                            className="form-control"
                            id="sport"
                            name="sport"
                            value={newTeam.sport}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="country" className="form-label">Страна</label>
                        <input
                            type="text"
                            className="form-control"
                            id="country"
                            name="country"
                            value={newTeam.country}
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