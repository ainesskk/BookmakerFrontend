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
import BetsList from "./Components/Bets/BetsList.jsx";

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
                        <Route path="bets" element={<BetsList />} />
                        <Route index element={<Navigate to="/userpage" />} />
                    </Route>
                    <Route path="/login" element={<Authorization />} />
                    <Route path="*" element={<Navigate to="/login" />} />
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
