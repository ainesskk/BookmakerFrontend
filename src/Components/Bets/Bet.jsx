import {useEffect, useState} from "react";

export default function Bet({bet}) {

    return (
        <>
            <div className="container p-3">
                <h4 className=" text-dark"> {bet.amount}</h4>
                <p className="fs-5 text-dark"> {bet.amount}</p>
            </div>
        </>
    )
}