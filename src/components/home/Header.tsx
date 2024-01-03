import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useLogoutMutation } from '../../store';
import { useEffect } from 'react';
import { useNotification } from '../../hooks/use-notification';
import Button from '../Button';

const Header: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const [logout, { data, isLoading, error }] = useLogoutMutation();
    const notification = useNotification();

    useEffect(() => {
        if (data) {
            notification({
                type: data?.logout ? 'success' : 'error',
                message: data?.logout ? 'Logout Success' : data?.error,
            });
        }
    }, [data]);

    const handleLogoutClick = (): void => {
        logout();
    };

    let content;

    if (user.id) {
        content = (
            <>
                <Button
                    className="bg-red-400 w-24 h-7 rounded-xl text-white text-center disabled:cursor-not-allowed"
                    loading={isLoading}
                    disabled={isLoading}
                    onClick={handleLogoutClick}
                >
                    LogOut
                </Button>
            </>
        );
    } else {
        content = (
            <>
                <Link to="/login" className="py-1 px-7 bg-green-400 rounded-xl text-center text-white">
                    Login
                </Link>
                <Link to="/register" className="py-1 px-5 bg-green-400 rounded-xl text-center mr-2 text-white">
                    Register
                </Link>
            </>
        );
    }

    return <div className="flex flex-row-reverse items-center mt-2 mr-1">{content}</div>;
};

export default Header;
