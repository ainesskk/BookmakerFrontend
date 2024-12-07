import {useEffect, useState} from "react";
import {getTransactions} from "../../../api/transactionApi.js";
import Transaction from "./Transaction.jsx";

export default function TransactionPage() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            setTransactions(await getTransactions());
        }
        fetchTransactions();
    }, [])

    return (
        <>
            <div className="container w-75 mt-5 mb-5 d-flex flex-column align-items-center">
                {
                    transactions.map(transaction => {
                        return <Transaction key={transaction.id} transaction={transaction}/>
                    })
                }
            </div>
        </>
    )
}