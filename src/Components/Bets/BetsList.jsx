import { useEffect, useState } from "react";
import {deleteBet, getUserBets} from "../../api/betApi.js";
import Bet from "./Bet.jsx";

export default function BetsList() {
    const [bets, setBets] = useState([]);
    const [betChanged, setBetChanged] = useState(false);
    const [betId, setBetId] = useState("");

    useEffect(() => {
        const fetchBets = async () => {
            const data = await getUserBets();
            console.log(data);
            setBets(Array.isArray(data) ? data : []);
        }

        fetchBets();
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

    const getBetStatus = (bet) => {
        return bet.status === "in_progress";
    };

    return (
        <>
            <div className="w-50 mt-5 m-auto">
                {
                    bets.map((bet) => {
                        const isActive = getBetStatus(bet);
                        return (
                            <div key={bet.id} className={`card w-75 m-auto mb-3 mt-3 bg-light 
                            ${isActive ? "border border-primary" : "bg-light" }`} style={{border: "none"}}>
                                <Bet bet={bet} isActive={isActive} />
                                {isActive && (
                                    <div className="d-flex justify-content-end align-items-center">
                                        <button className="btn btn-primary mb-3 me-3" onClick={(e) => handleBetDelete(e, bet.id)}>Удалить ставку</button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}
