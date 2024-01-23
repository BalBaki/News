import { useState, useEffect, useRef } from 'react';
import BottomIcon from './BottomIcon';
import { FaArrowUp } from 'react-icons/fa';

const PageUpIcon: React.FC = () => {
    const [showIcon, setShowIcon] = useState(false);
    const iconWrapper = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 500 && !showIcon) setShowIcon(true);

            if (window.scrollY < 500 && showIcon) {
                if (iconWrapper.current) iconWrapper.current.classList.add('animate-fade-out');

                setTimeout(() => {
                    setShowIcon(false);
                }, 450);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [showIcon]);

    const handlePageUpClick = (): void => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {showIcon && (
                <div ref={iconWrapper}>
                    <BottomIcon
                        position="left"
                        icon={<FaArrowUp />}
                        trigger={handlePageUpClick}
                        animation="little-bounce"
                    />
                </div>
            )}
        </>
    );
};

export default PageUpIcon;
