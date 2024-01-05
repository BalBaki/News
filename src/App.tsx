import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Notifications from './components/Notifications';
import { useVerify } from './hooks/use-verify';
import Loading from './components/Loading';

const App: React.FC = () => {
    const { isLoading } = useVerify();

    if (isLoading)
        return (
            <div className="h-screen">
                <Loading />
            </div>
        );

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <Notifications />
        </div>
    );
};

export default App;
