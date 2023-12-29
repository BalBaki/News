import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Notifications from './components/Notifications';
import { useVerify } from './hooks/use-verify';

const App: React.FC = () => {
    const verify = useVerify();

    useEffect(() => {
        verify();
    }, []);

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <Notifications />
        </>
    );
};

export default App;
