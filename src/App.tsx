import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { useVerify } from './hooks/use-verify';
import { useEffect } from 'react';

const App: React.FC = () => {
    const verify = useVerify();

    useEffect(() => {
        verify();
    }, []);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default App;
