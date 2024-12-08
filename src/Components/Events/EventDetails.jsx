import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTeamWithId } from "../../api/teamApi.js";
import { findEnglish } from "../../api/countries.js";
import ReactCountryFlag from "react-country-flag";
import CoefficientsList from "../Coefficients/CoefficientsList.jsx";
import { getEvent } from "../../api/eventApi.js";

export default function EventDetails() {
    const [newEvent, setNewEvent] = useState({});
    const { state } = useLocation();
    const { event } = state || {};
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [status, setStatus] = useState("");
    const [result, setResult] = useState("");
    const [isWorker, setIsWorker] = useState(false);
    const [timestamp, setTimestamp] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {

            const data = await getEvent(event.id);
            setNewEvent(data);

            const team1 = await getTeamWithId(data.team1Id);
            const team2 = await getTeamWithId(data.team2Id);
            setTeams([team1, team2]);

            if (data.result === "in_progress")
                setStatus("Запланировано")
            else{
                setStatus("Завершено");
                if (data.result === "win_team1") {
                    setResult(`Победа "${team1.name}"`);
                } else if (data.result === "win_team2") {
                    setResult(`Победа "${team2.name}"`);
                } else {
                    setResult("Ничья");
                }
            }

            const resultData = data.dateTime.match(/(\d{4})-(\d{2})-(\d{2})\w(\d{2}:\d{2}:\d{2})/);
            setTimestamp(resultData);
            setLoading(false);
        }

        fetchEvent();

        const role = localStorage.getItem("role");
        if (role === "Worker") setIsWorker(true);

    }, []);

    const handleEditEvent = (e) => {
        e.preventDefault();
        navigate("/editevent", { state: { team: newEvent } });
    }

    if (loading) {
        return (
            <div className="container d-flex justify-content-center w-100 m-auto">
                <div className="spinner-border position-absolute top-50 start-50 translate-middle" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="w-75 m-auto">
                <div className="card w-75 m-auto mb-3 mt-5">
                    <div className="card-body">
                        {
                            isWorker &&
                            <button className={"position-absolute btn btn-primary top-0 end-0 m-3"} style={{ padding: '8px 0' }} onClick={handleEditEvent}>
                                <img src={"../src/assets/edit.png"} alt={"edit"} style={{ width: "70%", margin: 0, padding: 0 }} />
                            </button>
                        }
                        <h4 className="card-title">{newEvent.name}</h4>
                        <h5 className="card-subtitle mb-2 text-muted">{newEvent.sport}</h5>
                        <p className="card-text fs-5 mb-0">Дата: {`${timestamp[3]}.${timestamp[2]}.${timestamp[1]}`}</p>
                        <p className="card-text fs-5 mb-0">Время: {timestamp[4]}</p>
                        {teams.length === 2 ? (
                            <div
                                className="w-75 m-auto mt-3 mb-3 rounded pt-3 pb-3 d-flex justify-content-center align-items-center"
                                style={{ backgroundColor: '#CED4DAFF' }}>
                                <p className="mb-0 fs-5 me-3">{teams[0].name}</p>
                                <ReactCountryFlag
                                    countryCode={findEnglish(teams[0].country)}
                                    svg
                                    style={{ width: '2em', height: '2em' }}
                                    title={findEnglish(teams[0].country)}
                                />
                                <p className="mb-0 fs-5 ms-2 me-2">/</p>
                                <p className="mb-0 fs-5 me-3">{teams[1].name}</p>
                                <ReactCountryFlag
                                    countryCode={findEnglish(teams[1].country)}
                                    svg
                                    style={{ width: '2em', height: '2em' }}
                                    title={findEnglish(teams[1].country)}
                                />
                            </div>
                        ) : (
                            <p>Загрузка команды...</p>
                        )}
                        <p className="card-text fs-5 mb-0">Статус: {status}</p>
                        {status === "Завершено" && <p className="card-text fs-5 mb-0">Результат: {result}</p>}
                    </div>
                </div>
                <div className="w-75 m-auto">
                    <CoefficientsList eventId={newEvent.id} eventResult={newEvent.result} teams={teams} />
                </div>
            </div>
        </>
    );
}
