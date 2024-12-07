import {useEffect, useState} from "react";
import {getTransactions} from "../../../api/transactionApi.js";
import Transaction from "./Transaction.jsx";
import {useNavigate} from "react-router-dom";

export default function TransactionPage() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [noTransactions, setNoTransactions] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            const data = await getTransactions();
            setTransactions(data);
            setNoTransactions(data.length === 0);
        }
        fetchTransactions();
    }, [])

    const handleEditBalance = (e) => {
        const transactionType = e.currentTarget.name;
        navigate('/changebalance', { state: { transactionType } });
    };

    return (
        <>
            <div className="container w-75 mt-5 mb-5 d-flex flex-column align-items-center">
                {
                    transactions.map(transaction => {
                        return <Transaction key={transaction.id} transaction={transaction}/>
                    })
                }
                {
                    noTransactions &&
                    <div className={"m-auto"}>
                        <h4 className={"m-auto"}>Транзакций не найдено</h4>
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
            </div>
        </>
    )
}