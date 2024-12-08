import { useState, useEffect } from 'react';
import { getTeams } from '../../api/teamApi.js';

export default function TeamSearchbar({ buttonClick, onSelectTeam }) {
    const [string, setString] = useState("");
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeams = async () => {
            if (string) {
                setLoading(true);
                const result = await getTeams(string);
                setTeams(result);
                setLoading(false);
            } else {
                setTeams([]);
            }
        };

        fetchTeams();
    }, [string]);

    const changeSearchString = (e) => {
        setString(e.target.value || "");
    };

    const handlerClickButton = (e) => {
        e.preventDefault();
        buttonClick();
    };

    const selectTeam = (team) => {
        setString(team.name);
        onSelectTeam(team); // Передача всего объекта команды
    };

    return (
        <>
            <div className="search-select">
                <button id="dropdownBtn" type="button" data-bs-toggle="dropdown" className="btn btn-primary fs-5" onClick={handlerClickButton}>
                    <span>{"Выбрать команду"}</span>
                    <i className="bi bi-caret-down-fill"></i>
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <input
                            autoFocus
                            type="text"
                            placeholder="Поиск команды..."
                            className="form-control"
                            style={{ border: "none" }}
                            value={string}
                            onChange={changeSearchString}
                        />
                    </li>
                    <div id="search-select-filtered-options">
                        {loading ? (
                            <li>
                                <a className="dropdown-item disabled">Загрузка...</a>
                            </li>
                        ) : (
                            teams.length > 0 ? (
                                teams.map((team) => (
                                    <li key={team.id}>
                                        <a className="dropdown-item" onClick={() => selectTeam(team)}>
                                            {team.name} ({team.sport})
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <a className="dropdown-item disabled">Нет совпадений</a>
                                </li>
                            )
                        )}
                    </div>
                </ul>
            </div>
        </>
    );
}
