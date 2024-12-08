import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Team({team}) {
    const navigate = useNavigate();
    const [timestamp, setTimestamp] = useState([]);
    const [result, setResult] = useState("");

    useEffect(() =>{

    }, []);

    const handleClick = () => {
        navigate("/teamdetails", { state: { team } });
    }

    return (
        <>
            <div className="card mb-3 mt-3">
                <div className="card-body">
                    <button>
                        <img />
                    </button>
                    <h4 className="card-title">{team.name}</h4>
                    <h5 className="card-subtitle mb-2 text-muted">{team.sport}</h5>
                    <p className="card-text fs-5 mb-0">{`Дата: ${timestamp[3]}.${timestamp[2]}.${timestamp[1]}`}</p>
                    <p className="card-text fs-5 mb-0">{`Время: ${timestamp[4]}`}</p>
                    <p className="card-text fs-5 mb-3">Статус: {result}</p>
                    <a className="card-link fs-5" onClick={handleClick}>Открыть</a>
                </div>
            </div>
        </>
    )
}