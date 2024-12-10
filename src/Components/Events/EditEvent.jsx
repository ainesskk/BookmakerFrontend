import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { putEvent } from "../../api/eventApi.js";

export default function EditUser() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { event } = state || { event: {} };
    const [notification, setNotification] = useState("");
    const [newEvent, setNewEvent] = useState({
        name: "",
        sport: "",
        dateTime: new Date().toISOString().slice(0, 16),
        result: "В процессе"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (event && event.name) {
            setNewEvent({
                name: event.name || "",
                sport: event.sport || "",
                dateTime: event.dateTime ? event.dateTime.slice(0, 16) : new Date().toISOString().slice(0, 16),
                result: event.result || "В процессе"
            });
        }
        setLoading(false);
    }, [event]);

    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleEditEventData = async (e) => {
        e.preventDefault();

        const localDate = new Date(newEvent.dateTime);
        const offset = localDate.getTimezoneOffset();
        const offsetDate = new Date(localDate.getTime() - (offset * 60 * 1000));
        const formattedDate = offsetDate.toISOString().slice(0, 16) + ":00+00";

        const requestData = {
            name: newEvent.name,
            sport: newEvent.sport,
            dateTime: formattedDate,
            result: newEvent.result
        };

        const status = await putEvent(event.id, requestData);
        if (status === 200) {
            navigate(-1);
        } else {
            setNotification("Возникла ошибка при редактировании");
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 col-3 fs-5 d-flex justify-content-center">
                <p>Загрузка...</p>
            </div>
        );
    }

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
                            value={newEvent.dateTime}
                            onChange={handleChange}
                        />
                    </div>
                    {event && event.result && event.result === "in_progress" &&
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
