import {useEffect} from "react";

export default function Coefficient({ coefficient, coefficientType, betCreated, isSelected, onClick, canBeSelected }) {

    return (
        <>
            <button
                type="button"
                className={`card w-100 btn mb-2 ${canBeSelected ? (isSelected ? "btn-primary text-white bg-primary" : "btn-outline-primary") : "disabled"}`}
                onClick={onClick}
                disabled={!canBeSelected}
            >
                <div className="card-body d-flex justify-content-between align-items-center" style={{ width: '100%' }}>
                    <p className={`card-text mb-0 fs-5 ${isSelected ? "text-white" : ""}`} style={{ flex: '1', textAlign: 'left' }}>
                        {coefficientType}
                    </p>
                    <p className={`card-text mb-0 fs-5 ${isSelected ? "text-white" : ""}`} style={{ flex: '1', textAlign: 'right' }}>
                        {coefficient.value}
                    </p>
                </div>
            </button>
        </>
    );
}
