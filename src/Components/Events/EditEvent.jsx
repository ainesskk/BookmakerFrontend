import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { setEditData } from "../../api/localStorageFunctions.js";
import { putEvent } from "../../api/eventApi.js";

export default function EditUser() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { event } = state || {};
    const [notification, setNotification] = useState(" ");
    const [newEvent, setNewEvent] = useState({
        name: event.name || "",
        sport: event.sport || "",
        dateTime: event.dateTime || new Date().toISOString(),
        result: event.result || "В процессе"
    });

    const handleChange = (event) => {
        setNewEvent({ ...newEvent, [event.target.name]: event.target.value });
    };

    const handleEditEventData = async (e) => {
        e.preventDefault();

        const newDate =  new Date(newEvent.dateTime).toISOString().replace('.000Z', '+00')

        const requestData = {
            name: newEvent.name,
            sport: newEvent.sport,
            dateTime: newDate,
            result: newEvent.result
        };

        const status = await putEvent(event.id, requestData);
        if (status === 200) {
            navigate(-1)
        } else {
            setNotification("Возникла ошибка при редактировании");
        }
    };

    return (
        <>
            <div className="container mt-5 col-3 fs-5 d-flex justify-content-center">
                <form className="w-100" onSubmit={handleEditEventData}>
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
                    {
                        event.result === "in_progress" &&
                            <div className="mb-3">
                                <label htmlFor="result" className="form-label">Результат</label>
                                <select
                                    className="form-select"
                                    id="result"
                                    name="result"
                                    value={newEvent.result}
                                    onChange={handleChange}
                                >
                                    <option value="in_progress">В процессе</option>
                                    <option value="win_team1">Победила первая команда</option>
                                    <option value="win_team2">Победила вторая команда</option>
                                    <option value="draw">Ничья</option>
                                </select>
                            </div>
                    }
                    <button type="submit" className="btn btn-primary fs-5">Подтвердить</button>
                    <p className="display-3 mt-3 fs-5">{notification}</p>
                </form>
            </div>
        </>
    );
}