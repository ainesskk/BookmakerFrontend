import {useEffect, useState} from "react";
import {getLoginTransactions, getTransactions} from "../../../api/transactionApi.js";
import Transaction from "./Transaction.jsx";
import {useLocation, useNavigate} from "react-router-dom";

export default function TransactionPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { userLogin, userFullName } = state || {};
    const [transactions, setTransactions] = useState([]);
    const [noTransactions, setNoTransactions] = useState(false);
    const [isWorker, setIsWorker] = useState(false);

    useEffect(() => {

        const role = localStorage.getItem("role");
        if (role === "Worker") setIsWorker(true);

        const fetchLoginTransactions = async () => {
            const data = await getLoginTransactions(userLogin);
            setTransactions(data);
            setNoTransactions(data.length === 0);
        }

        const fetchTransactions = async () => {
            const data = await getTransactions();
            setTransactions(data);
            setNoTransactions(data.length === 0);
        }

        if (role === "Worker") fetchLoginTransactions();
        else fetchTransactions();
    }, [])

    const handleEditBalance = (e) => {
        const transactionType = e.currentTarget.name;
        navigate('/changebalance', { state: { transactionType } });
    };

    return (
        <>
            <div className="container w-75 mt-5 mb-5 d-flex flex-column align-items-center">
                {
                    userFullName &&
                    <>
                        <h4 className={"m-auto mb-4"}>{userFullName}</h4>
                    </>
                }
                {
                    transactions.map(transaction => {
                        return <Transaction key={transaction.id} transaction={transaction}/>
                    })
                }
                {
                    (noTransactions && !isWorker) &&
                    <div className={"m-auto"}>
                        <p className={"m-auto fs-4"}>Транзакций не найдено</p>
                        <div className="button mt-4 d-flex justify-content-evenly align-items-center">
                            <button name="deposit" className="btn btn-sm me-3 btn-outline-primary w-80"
                                    onClick={handleEditBalance}>
                                <p className="fs-5 mb-0 p-1">Пополнить</p>
                            </button>
                            <button name="withdrawal" className="btn btn-sm btn-outline-primary w-80"
                                    onClick={handleEditBalance}>
                                <p className="fs-5 mb-0 p-1">Вывести</p>
                            </button>
                        </div>
                    </div>
                }
                {
                    (noTransactions && isWorker) &&
                    <div className={"m-auto"}>
                        <p className={"m-auto fs-4"}>Транзакций не найдено</p>
                    </div>
                }
            </div>
        </>
    )
}