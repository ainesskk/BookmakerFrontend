import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTeamWithId } from "../../api/teamApi.js";
import { findEnglish } from "../../api/countries.js";
import ReactCountryFlag from "react-country-flag";
import CoefficientsList from "../Coefficients/CoefficientsList.jsx";

export default function EventDetails() {
    const { state } = useLocation();
    const { event } = state || {};
    const [teams, setTeams] = useState([]);
    const [status, setStatus] = useState("");
    const [result, setResult] = useState("");
    const [timestamp, setTimestamp] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            if (event) {
                const team1 = await getTeamWithId(event.team1Id);
                const team2 = await getTeamWithId(event.team2Id);
                setTeams([team1, team2]);

                if (event.result === "in_progress") {
                    setStatus("Запланировано");
                } else {
                    setStatus("Завершено");
                    if (event.result === "win_team1") {
                        setResult(`Победа "${team1.name}"`);
                    } else if (event.result === "win_team2") {
                        setResult(`Победа "${team2.name}"`);
                    } else {
                        setResult("Ничья");
                    }
                }
            }
        };

        fetchTeams();

        const resultData = event.dateTime.match(/(\d{4})-(\d{2})-(\d{2})\w(\d{2}:\d{2}:\d{2})/);
        setTimestamp(resultData);

    }, [event]);

    return (
        <>
            <div className="w-75 m-auto">
                <div className="card w-75 m-auto mb-3 mt-5 ">
                    <div className="card-body">
                        <h4 className="card-title">{event.name}</h4>
                        <h5 className="card-subtitle mb-2 text-muted">{event.sport}</h5>
                        <p className="card-text fs-5 mb-0">Дата: {`${timestamp[3]}.${timestamp[2]}.${timestamp[1]}`}</p>
                        <p className="card-text fs-5 mb-0">Время: {timestamp[4]}</p>
                        {teams.length === 2 ? (
                            <div className="w-75 m-auto mt-3 mb-3 rounded pt-3 pb-3 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#CED4DAFF'}}>
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
                            <p>Загрузка события...</p>
                        )}
                        <p className="card-text fs-5 mb-0">Статус: {status}</p>
                        {status === "Завершено" && <p className="card-text fs-5 mb-3">Результат: {result}</p>}

                    </div>
                </div>
                <div className="w-75 m-auto">
                    <CoefficientsList eventId={event.id} eventResult={event.result} teams={teams} />
                </div>
            </div>
        </>
    );
}
