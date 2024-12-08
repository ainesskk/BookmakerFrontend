import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTeamWithId } from "../../api/teamApi.js";

export default function TeamDetails() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { team } = state || {};
    const [newTeam, setNewTeam] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            const data = await getTeamWithId(team.id);
            setNewTeam(data);
            setLoading(false);
        }

        fetchTeam();
    }, [team.id]);

    const editTeam = () => {
        navigate("/editteam", { state: { team: newTeam } });
    };

    if (loading) {
        return (
            <div className="container d-flex justify-content-center w-100 m-auto">
                <div className="spinner-border position-absolute top-50 start-50 translate-middle" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card p-3 w-50">
                    <button className={"position-absolute btn btn-primary top-0 end-0 m-3"} style={{ padding: '8px 0' }}
                            onClick={editTeam}>
                        <img src={"../src/assets/edit.png"} alt={"edit"} style={{ width: "70%", margin: 0, padding: 0 }} />
                    </button>
                    <div className="d-flex fs-5 align-items-center user-page-container">
                        <div className="ml-3 w-100 user-page">
                            <h3 className="mb-0 mt-0">{newTeam.name}</h3>
                            <p className="mt-3 mb-1">Спорт: {newTeam.sport}</p>
                            <p className="mb-0">Страна: {newTeam.country}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
