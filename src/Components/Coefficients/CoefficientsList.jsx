import { useEffect, useState } from "react";
import { getCoefficients } from "../../api/coefficientApi.js";
import Coefficient from "./Coefficient.jsx";
import {postBet} from "../../api/betApi.js";
import {getUserBalance} from "../../api/userApi.js";
import {setEditBalance} from "../../api/localStorageFunctions.js";

export default function CoefficientsList({ eventId, eventResult, teams }) {
    const [coefficients, setCoefficients] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [betCreated, setBetCreated] = useState(false);
    const [canBeSelected, setCanBeSelected] = useState(eventResult === "in_progress");
    const [notification, setNotification] = useState(" ");
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const fetchCoefficients = async () => {
            const data = await getCoefficients(eventId);
            setCoefficients(data);
        };

        fetchCoefficients();
    }, [eventId, betCreated]);

    useEffect(() => {
        setCanBeSelected(eventResult === "in_progress");
    }, [eventResult]);

    const handleChange = (e) => {
        setAmount(e.target.value);
    }

    const handleSubmitTransaction = async (e) => {
        e.preventDefault();

        if (!selectedId){
            setNotification("Выберите коэффициент");
            return;
        }

        const requestData = {
            amount: amount,
        }
        console.log(selectedId);

        const status = await postBet(selectedId, requestData);
        if(status === 204){
            const newBalance = await getUserBalance();
            await setEditBalance(newBalance);
            setNotification("Ставка успешно сделана");
            setBetCreated(true)
        }
        else {
            setNotification("Недостаточно средств на счету");
        }
    }

    if (teams.length !== 2) {
        return <p>Загрузка коэффициентов...</p>;
    }

    return (
        <>
            {coefficients.map((coefficient) => {
                let coefType;
                if (coefficient.type === "win_team1") {
                    coefType = `Победа "${teams[0].name}"`;
                } else if (coefficient.type === "win_team2") {
                    coefType = `Победа "${teams[1].name}"`;
                } else {
                    coefType = "Ничья";
                }
                return (
                    <Coefficient
                        key={coefficient.id}
                        coefficient={coefficient}
                        coefficientType={coefType}
                        canBeSelected={canBeSelected}
                        isSelected={ canBeSelected ? selectedId === coefficient.id : null}
                        onClick={() => {
                            if (canBeSelected) {
                                if (selectedId === coefficient.id) {
                                    setSelectedId(null);
                                } else {
                                    setSelectedId(coefficient.id);
                                }
                            }
                        }}
                    />
                );
            })}
            {
                canBeSelected ?
                    <>
                        <form className="w-75 text-centermt-5 m-auto mt-5" onSubmit={handleSubmitTransaction}>

                            <div className="d-flex justify-content-between align-items-center">
                                <label className="fs-5 mb-2 w-25 text-end me-3">Сумма ставки :</label>
                                <input
                                    type="text"
                                    className="form-control w-50"
                                    id="amount"
                                    name="amount"
                                    onChange={handleChange}
                                />
                                <button type="submit" className="btn w-25 btn-primary fs-5 ms-3">Подтвердить</button>
                            </div>

                        </form>
                        <div className="w-50 text-center m-auto">
                            <p className="display-3 mt-3 fs-5">{notification}</p>
                        </div>

                    </>
                    : <></>
            }
        </>
    );
}
