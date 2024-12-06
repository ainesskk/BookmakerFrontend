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
            {
                transactions.map(transaction => {
                   return <Transaction key={transaction.id} transaction={transaction} />
                })
            }
        </>
    )
}