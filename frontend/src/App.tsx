import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import NoPage from './pages/NoPage';
import Notifications from './components/Notifications';
import { useVerify } from './hooks/use-verify';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
    const { isLoading } = useVerify();

    if (isLoading)
        return (
            <div className="h-screen">
                <Loading />
            </div>
        );

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/favorites"
                    element={
                        <ProtectedRoute>
                            <Favorites />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NoPage />} />
            </Routes>
            <Notifications />
        </>
    );
};

export default App;
