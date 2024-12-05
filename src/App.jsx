import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AppProvider, AppContext } from "./contexts/AppContext.jsx";
import Authorization from "./Components/Authorization/Authorization.jsx";
import UserPage from "./UserPage/UserPage.jsx";
import { useContext } from "react";

function App() {
    return (
        <AppProvider>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <UserPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<Authorization />} />
                </Routes>
            </Router>
        </AppProvider>
    );
}

function ProtectedRoute({ children }) {
    const { isLogged } = useContext(AppContext);

    return isLogged ? children : <Navigate to="/login" />;
}

export default App;
