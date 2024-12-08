import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import { AppProvider, AppContext } from "./contexts/AppContext.jsx";
import Authorization from "./Components/Authorization/Authorization.jsx";
import UserPage from "./Components/UserPage/UserPage.jsx";
import EditUser from "./Components/UserPage/EditUser.jsx";
import EditBalance from "./Components/UserPage/Balance/EditBalance.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { useContext } from "react";
import TransactionPage from "./Components/UserPage/Transactions/TransactionPage.jsx";
import EventsPage from "./Components/Events/EventsPage.jsx";
import EventDetails from "./Components/Events/EventDetails.jsx";
import EditEvent from "./Components/Events/EditEvent.jsx";
import BetsList from "./Components/Bets/BetsList.jsx";
import UsersPage from "./Components/Users/UsersPage.jsx";
import UserDetails from "./Components/Users/UserDetails.jsx";
import EditUserRole from "./Components/Users/EditUserRole.jsx";
import AddUser from "./Components/Users/AddUser.jsx";
import TeamsPage from "./Components/Teams/TeamsPage.jsx"
import AddEvent from "./Components/Events/AddEvent.jsx";
import TeamDetails from "./Components/Teams/TeamDetails.jsx";
import EditTeam from "./Components/Teams/EditTeam.jsx";
import AddTeam from "./Components/Teams/AddTeam.jsx";

function App() {
    return (
        <AppProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<ProtectedLayout />}>
                        <Route path="userpage" element={<UserPage />} />
                        <Route path="edituser" element={<EditUser />} />
                        <Route path="changebalance" element={<EditBalance />} />
                        <Route path="transactions" element={<TransactionPage />} />
                        <Route path="events" element={<EventsPage />} />
                        <Route path="eventdetails" element={<EventDetails />} />
                        <Route path="editevent" element={<EditEvent />} />
                        <Route path="addevent" element={<AddEvent />} />
                        <Route path="bets" element={<BetsList />} />
                        <Route path="users" element={<UsersPage />} />
                        <Route path="userdetails" element={<UserDetails />} />
                        <Route path="edituserdetails" element={<EditUserRole />} />
                        <Route path="adduser" element={<AddUser />} />
                        <Route path="teams" element={<TeamsPage />} />
                        <Route path="teamdetails" element={<TeamDetails />} />
                        <Route path="editteam" element={<EditTeam />} />
                        <Route path="addTeam" element={<AddTeam />} />
                        <Route index element={<Navigate to="/userpage" />} />
                    </Route>
                    <Route path="/login" element={<Authorization />} />
                    <Route path="*" element={<Navigate to="/userpage" />} />
                </Routes>
            </Router>
        </AppProvider>
    );
}

function ProtectedLayout() {
    const { isLogged, loading } = useContext(AppContext);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!isLogged) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default App;
