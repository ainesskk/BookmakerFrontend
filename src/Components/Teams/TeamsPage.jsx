import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTeams } from '../../api/teamApi.js';
import Searchbar from "../Searchbar/Searchbar.jsx";
import TeamsList from "./TeamsList.jsx";
import AddButton from "../../AddButton.jsx";

export default function TeamsPage() {
    const navigate = useNavigate();
    const [searchStringTeam, setSearchStringTeam] = useState(() => sessionStorage.getItem("searchStringTeam") || "");
    const [teams, setTeams] = useState([]);
    const [noTeams, setNoTeams] = useState(false);

    useEffect(() => {
        sessionStorage.setItem("searchStringTeam", searchStringTeam);
        if (searchStringTeam !== "") {
            teamsSearch();
        } else {
            setNoTeams(true);
            setTeams([]);
        }
    }, [searchStringTeam]);

    const teamsSearch = async () => {
        if (searchStringTeam === "") {
            setNoTeams(true);
            setTeams([]);
            return;
        }

        const data = await getTeams(searchStringTeam);
        if (data !== undefined) {
            if (data.length !== 0) {
                setTeams(data);
                setNoTeams(false);
            } else {
                setNoTeams(true);
                setTeams([]);
            }
        } else {
            setNoTeams(true);
            setTeams([]);
        }
    };

    const buttonClick = async () => {
        teamsSearch();
    };

    const handleAddTeam = () => {
        navigate("/addteam", { state: {teams}});
    };

    const updateSearchStringTeam = (searchStringTeam) => {
        setSearchStringTeam(searchStringTeam);
    };

    return (
        <>
            <div className="w-50 mt-5 m-auto position-relative">
                <div className="w-100">
                    <Searchbar
                        searchString={searchStringTeam}
                        updateSearchString={updateSearchStringTeam}
                        buttonClick={buttonClick}
                        placeholder={"Введите название команды..."}
                    />
                </div>
                <AddButton url={"addteam"} />
                <button className="btn btn-primary fs-4 position-absolute top-0" style={{ right: "-4vw", padding: "9px 0" }} onClick={handleAddTeam}>
                    <div className="d-flex justify-content-center align-items-center">
                        <img src="./src/assets/plus.png" alt="plus" style={{ width: "50%" }} />
                    </div>
                </button>
            </div>
            <div className="w-50 mt-5 m-auto">
                {noTeams ?
                    <div className="d-flex justify-content-center align-items-center">
                        <p className="fs-5 m-auto pt-4">Нет результатов</p>
                    </div> :
                    <TeamsList teams={teams} />}
            </div>
        </>
    );
}
