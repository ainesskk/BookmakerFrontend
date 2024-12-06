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
                        <Route index element={<Navigate to="/userpage" />} /> {/* Редирект на userpage по умолчанию */}
                    </Route>
                    <Route path="/login" element={<Authorization />} />
                    <Route path="*" element={<Navigate to="/login" />} /> {/* Редирект на login для всех неизвестных маршрутов */}
                </Routes>
            </Router>
        </AppProvider>
    );
}

function ProtectedLayout() {
    const { isLogged, loading } = useContext(AppContext);

    if (loading) {
        return <div>Загрузка...</div>; // Показываем индикатор загрузки
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
