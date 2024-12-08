import {useEffect, useState} from "react";
import SearchBar from "../Searchbar/Searchbar.jsx";
import UsersList from "./UsersList.jsx";
import {getUsers} from "../../api/userApi.js";
import {useNavigate} from "react-router-dom";
import AddButton from "../../AddButton.jsx";

export default function UsersPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [noUsers, setNoUsers] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchString, setSearchString] = useState(() => sessionStorage.getItem("searchString") || "");


    useEffect(() => {
        sessionStorage.setItem("searchString", searchString);
        if (searchString !== "") {
            usersSearch();
        } else {
            setNoUsers(true);
            setUsers([]);
        }
    }, [searchString])

    useEffect(() => {
        setIsAdmin(localStorage.getItem("role") === "Admin");
    }, [])

    const usersSearch = async () => {
        if (searchString === "") {
            setNoUsers(true);
            setUsers([]);
            return;
        }

        const data = await getUsers(searchString)
        if (data !== undefined) {
            if (data.length !== 0) {
                setUsers(data);
                setNoUsers(false);
            } else {
                setNoUsers(true);
                setUsers([]);
            }
        } else {
            setNoUsers(true);
            setUsers([]);
        }
    };

    const buttonClick = async () => {
        usersSearch();
    };

    const updateSearchString = (searchString) => {
        setSearchString(searchString);
    }

    return (
        <>
            <div className="w-50 mt-5 m-auto position-relative">
                <div className="w-100">
                    <SearchBar searchString={searchString} updateSearchString={updateSearchString}
                               buttonClick={buttonClick} placeholder={"Введите логин или ФИО..."}/>
                </div>
                {
                    isAdmin && <AddButton url={"adduser"} />
                }
            </div>
            <div className="w-50 mt-5 m-auto">
                {noUsers === true ?
                    <div className="d-flex justify-content-center align-items-center">
                        <p className="fs-5 m-auto pt-4">Нет результатов</p>
                    </div> :
                    <UsersList users={users}/>}
            </div>


        </>
    )
}