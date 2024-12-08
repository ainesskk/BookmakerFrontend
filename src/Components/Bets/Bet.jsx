import {useEffect, useState} from "react";
import {getUserBets} from "../../api/betApi.js";
import {getTeamWithId} from "../../api/teamApi.js";
import {useNavigate} from "react-router-dom";
import {getEvent} from "../../api/eventApi.js";

export default function Bet({bet}) {
    const navigate = useNavigate();
    const [betChanged, setBetChanged] = useState(false);
    const [status, setStatus] = useState("");

    const [betStatus, setBetStatus] = useState("");
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBet = async () => {
            console.log(bet)
            const team1 = await getTeamWithId(bet.team1Id);
            const team2 = await getTeamWithId(bet.team2Id);

            if (bet.coefficientType === "in_progress")
                setStatus("in_progress")
            else if (bet.coefficientType === "win_team1")
                setResult(`Победа "${team1.name}"`)
            else if (bet.coefficientType === "win_team2")
                setResult(`Победа "${team2.name}"`);
            else
                setResult("Ничья");

            if (bet.status === "win")
                setBetStatus("Победа")
            else if (bet.status === "lost")
                setBetStatus("Проигрыш")
            else setBetStatus("in_progress")

            setLoading(false)
        }

        fetchBet()

        setBetChanged(false)
    }, [betChanged]);

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
            <div className="container p-3">
                <h4 className=" text-dark"> {bet.eventTitle}</h4>
                <p className="fs-5 mb-0 text-dark">Исход: {result}</p>
                {
                    betStatus !== "in_progress" &&
                    <>
                        <p className="fs-5 mb-0 text-dark">Статус: {betStatus}</p>
                    </>
                }
                <p className="fs-5 mb-0 text-dark">Сумма ставки: {bet.amount}</p>
            </div>
        </>
    )
}