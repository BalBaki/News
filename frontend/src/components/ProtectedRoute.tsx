import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { id } = useSelector((state: RootState) => state.user);

    return <>{id ? children : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
