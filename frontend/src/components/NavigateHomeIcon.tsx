import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NavigateHomeIcon: React.FC = () => {
    const navigate = useNavigate();

    const handleIconClick = (): void => {
        navigate('/');
    };

    return (
        <div
            className="fixed bottom-2 left-2 w-16 h-16 p-3 bg-black text-white rounded-full z-50 cursor-pointer 
                shadow-[0_0_15px_10px_rgb(255,0,0)] "
            onClick={handleIconClick}
        >
            <FaHome className="w-full h-full animate-little-bounce" />
        </div>
    );
};

export default NavigateHomeIcon;
