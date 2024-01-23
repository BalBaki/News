import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import BottomIcon from './BottomIcon';

const NavigateHomeIcon: React.FC = () => {
    const navigate = useNavigate();

    const handleIconClick = (): void => {
        navigate('/');
    };

    return <BottomIcon position="left" trigger={handleIconClick} icon={<FaHome />} animation="pulse" />;
};

export default NavigateHomeIcon;
