import "./Authorization.css"
import {useState} from "react";
import Registration from "./Registration";
import Login from "./Login.jsx";

export default function Authorization() {
    const [authorizationType, setAuthorizationType] = useState("login")
    const activeButton = "btn-secondary"
    const disabledButton = "btn-outline-secondary"
    const [registerButton, setRegisterButton] = useState(disabledButton)
    const [loginButton, setLoginButton] = useState(activeButton)

    const handleOnCLick = (e) => {
        if (e.target.id === "register-button-controller") {
            setAuthorizationType("register")
            setLoginButton(disabledButton)
            setRegisterButton(activeButton)
        }
        else{

            setAuthorizationType("login")
            setRegisterButton(disabledButton)
            setLoginButton(activeButton)
        }
    }


    return (
        <>
            <div className="auth-container">
                {authorizationType === "login" ? <Login /> : <Registration />}
                <div className="authorization-buttons-container">
                    <button id="register-button-controller" type="button" className={`btn ${registerButton}`} onClick={handleOnCLick}>Регистрация</button>
                    <button id="login-button-controller" type="button" className={`btn ${loginButton}`} onClick={handleOnCLick}>Вход</button>
                </div>
            </div>
        </>
    )
}