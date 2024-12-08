import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Team({team}) {
    const navigate = useNavigate();

    useEffect(() =>{

    }, []);

    const handleClick = () => {
        navigate("/teamdetails", { state: { team } });
    }

    return (
        <>
            <button key={team.id} className="card mb-3 mt-3 btn btn-light w-100" onClick={handleClick}>
                <div className="card-body d-flex justify-content-evenly align-items-center w-100">
                    <p className="card-text fs-5 m-0 w-50 text-center">{team.name}</p>
                    <p className="card-text fs-5 m-0 w-50 text-center">{team.sport}</p>
                </div>
            </button>
        </>
    )
}