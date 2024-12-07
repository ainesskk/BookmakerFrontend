import {useEffect, useState} from "react";

export default function Transaction({transaction}){
    const [timestamp, setTimestamp] = useState([]);
    useEffect(() =>{
        const resultData = transaction.dateTime.match(/(\d{4})-(\d{2})-(\d{2})\w(\d{2}:\d{2}:\d{2})/);
        setTimestamp(resultData);
    }, []);
    return (
        <>
            <div className="w-50 justify-content-center">
                <div className="border border-primary p-2 rounded mb-3 d-flex justify-content-evenly align-items-center">
                    <div className="w-50 text-center">
                        <p className="m-0 fs-5">{`${timestamp[3]}.${timestamp[2]}.${timestamp[1]} ${timestamp[4]}`}</p>
                    </div>
                    <div className="w-50 text-center">
                        <p className={transaction.type === "deposit" ? `m-0 fs-5 text-success fw-bold` : `m-0 fs-5 text-danger fw-bold`}>
                            {transaction.type === "deposit" ? `+${transaction.amount}` : `-${transaction.amount}`}</p>
                    </div>

                </div>
            </div>

        </>
    )
}