import {postTransaction} from "../../../api/transactionApi.js";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {setEditBalance} from "../../../api/localStorageFunctions.js";
import {getUserBalance} from "../../../api/userApi.js";

export default function EditBalance() {
    const { state } = useLocation();
    const { transactionType } = state || {};
    const [notification, setNotification] = useState(" ");
    const [header, setHeader] = useState("Укажите сумму для");
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        (transactionType === "withdrawal" && transactionType !== null && transactionType !==undefined) ?
            setHeader(header + " списания") : setHeader(header + " пополнения");
    }, [transactionType])

    const handleChange = (e) => {
        setAmount(e.target.value);
    }

    const handleSubmitTransaction = async (e) => {
        e.preventDefault();
        const requestData = {
            type: transactionType,
            amount: amount,
        }

        const status = await postTransaction(requestData);
        if(status === 204){
            const newBalance = await getUserBalance();
            await setEditBalance(newBalance);
            navigate("/userpage");
        }
        else {
            (transactionType === "withdrawal" && transactionType !== null && transactionType !==undefined) ?
                setNotification("Недостаточно средств") : setNotification("Ошибка при пополнении счёта")
        }
    }

    return (
        <>
            <div className="container mt-5 col-3 fs-5 d-flex justify-content-center">
                <form className="w-75 text-center" onSubmit={handleSubmitTransaction}>
                    <h5 className="mb-3">{header}</h5>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control w-100"
                            id="amount"
                            name="amount"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary fs-5">Подтвердить</button>
                    <p className="display-3 mt-3 fs-5">{notification}</p>
                </form>
            </div>
        </>
    )
}