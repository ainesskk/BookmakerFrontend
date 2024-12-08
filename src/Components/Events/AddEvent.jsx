import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postEvent } from "../../api/eventApi.js";
import TeamSearchbar from "../Searchbar/TeamSearchbar.jsx";

export default function AddEvent() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState(" ");
    const [selectedTeam1, setSelectedTeam1] = useState({});
    const [selectedTeam2, setSelectedTeam2] = useState({});
    const [newEvent, setNewEvent] = useState({
        name: "",
        sport: "",
        dateTime:"",
        team1Id: "",
        team2Id: "",
        margin: 0,
    });

    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();

        const newDate = new Date(newEvent.dateTime).toISOString().replace('.000Z', '+00')

        const requestData = {
            name: newEvent.name,
            sport: newEvent.sport,
            dateTime: newDate,
            team1Id: selectedTeam1.id,
            team2Id: selectedTeam2.id,
            margin: newEvent.margin,
        };

        console.log(requestData);

        const status = await postEvent(requestData);
        console.log(status)
        if (status === 201) {
            navigate(-1);
        } else {
            setNotification("Возникла ошибка при создании");
        }
    };

    const handleSelectTeam1 = (team) => {
        console.log(team.id);
        setSelectedTeam1(team);
    };

    const handleSelectTeam2 = (team) => {
        console.log(team.id);
        setSelectedTeam2(team);
    };

    const handleButtonClick = () => {};

    return (
        <>
            <div className="container w-75 mt-5 col-3 fs-5 d-flex justify-content-center">
                <form className="w-50" onSubmit={handleAddEvent}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Название события</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={newEvent.name}
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
                            value={newEvent.sport}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dateTime" className="form-label">Дата и время</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="dateTime"
                            name="dateTime"
                            value={newEvent.dateTime.slice(0, 16)}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Команда 1</label>
                        <div className="input-group mb-3 d-flex">
                            <TeamSearchbar
                                buttonClick={handleButtonClick}
                                onSelectTeam={handleSelectTeam1}
                            />
                            <input
                                type="text"
                                className="form-control ms-3 fs-5"
                                id="team1"
                                name="team1"
                                value={selectedTeam1.name || ""}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Команда 2</label>
                        <div className="input-group mb-3 d-flex">
                            <TeamSearchbar
                                buttonClick={handleButtonClick}
                                onSelectTeam={handleSelectTeam2}
                            />
                            <input
                                type="text"
                                className="form-control ms-3 fs-5"
                                id="team2"
                                name="team2"
                                value={selectedTeam2.name || ""}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="margin" className="form-label">Маржа</label>
                        <input
                            type="number"
                            className="form-control"
                            id="margin"
                            name="margin"
                            step="0.01"
                            value={newEvent.margin}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 fs-5">Подтвердить</button>
                    <p className="display-3 mt-3 fs-5">{notification}</p>
                </form>
            </div>
        </>
    );
}
