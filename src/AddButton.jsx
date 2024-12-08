import {useNavigate} from "react-router-dom";

export default function AddButton({url}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${url}`);
    }

    return (
        <>
            <button className="btn btn-primary fs-4 position-absolute top-0"
                    style={{right: "-4vw", padding: "9px 0"}} onClick={handleClick}>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="./src/assets/plus.png" alt="plus" style={{width: "50%"}}/>
                </div>
            </button>
        </>
    )
}