import { useEffect, useState } from "react";
import {deleteBet, getUserBets} from "../../api/betApi.js";
import Bet from "./Bet.jsx";
import {useNavigate} from "react-router-dom";

export default function BetsList() {
    const navigate = useNavigate();
    const [activeBets, setActiveBets] = useState([]);
    const [closedBets, setClosedBets] = useState([]);
    const [noBets, setNoBets] = useState(true);
    const [betChanged, setBetChanged] = useState(false);

    useEffect(() => {
        const fetchBets = async () => {
            const data = await getUserBets();
            setActiveBets(data.filter(bet =>
                bet.status === "in_progress"
            ))
            setClosedBets(data.filter(bet =>
                bet.status !== "in_progress"
            ))
        }

        fetchBets();
        if(closedBets.length === 0 && activeBets.length === 0) setNoBets(false);
        setBetChanged(false)
    }, [betChanged]);

    const handleBetDelete = async (e, id) => {
        e.preventDefault();
        const fetchBetDelete = async () => {
            const status = await deleteBet(id);
            if (status === 204) {
                setBetChanged(true);
            }
        }

        fetchBetDelete();
    }

    const handleMakeBet = () => {
        navigate("/events")
    }

    return (
        <>
            <div className="w-50 mt-5 m-auto">
                {
                    activeBets.length === 0 ? null : <h4 className={"w-75 m-auto mt-5 mb-3"}>Активные</h4>
                }
                {
                    activeBets.map((bet) => {
                        return (
                            <div key={bet.id} className="card w-75 m-auto mb-3 mt-3 bg-light border border-primary"
                                 style={{border: "none"}}>
                                <Bet bet={bet}/>
                                <div className="d-flex justify-content-end align-items-center">
                                    <button className="btn btn-primary mb-3 me-3"
                                            onClick={(e) => handleBetDelete(e, bet.id)}>Удалить ставку
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
                {
                    closedBets.length === 0 ? null: <h4 className={"w-75 m-auto mt-5 mb-3"}>Закрытые</h4>
                }
                {
                    closedBets.map((bet) => {
                        return (
                            <div key={bet.id} className="card w-75 m-auto mb-3 mt-3 bg-light" style={{border: "none"}}>
                                <Bet bet={bet}/>
                            </div>
                        );
                    })
                }
                {
                    noBets &&
                        <div className=" mt-5 m-auto d-flex flex-column align-items-center">
                            <h4>Ставок не найдено</h4>
                            <button className="btn btn-primary fs-5 mt-4" onClick={handleMakeBet}>Сделать ставку</button>
                        </div>
                }
            </div>
        </>
    )
}
