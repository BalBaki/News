import { useState, useEffect, useRef } from 'react';
import BottomIcon from './BottomIcon';
import { FaArrowUp } from 'react-icons/fa';

const SCROLL_LIMIT = 500;

const PageUpIcon: React.FC = () => {
    const [showIcon, setShowIcon] = useState(false);
    const iconWrapper = useRef<HTMLDivElement | null>(null);

    const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
        event.propertyName === 'opacity' && setShowIcon(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= SCROLL_LIMIT && !showIcon) setShowIcon(true);

            if (window.scrollY < SCROLL_LIMIT && showIcon && iconWrapper.current)
                iconWrapper.current.classList.add('opacity-0');
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
                <div
                    ref={iconWrapper}
                    className="transition duration-300 ease-in-out"
                    onTransitionEnd={handleTransitionEnd}
                >
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
