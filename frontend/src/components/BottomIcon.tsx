import React from 'react';
import classNames from 'classnames';

type BottomIconProps = {
    position: 'left' | 'right';
    trigger?: () => void;
    animation?: 'little-bounce' | 'pulse' | 'ping';
    icon: React.ReactNode;
    className?: string;
};

const BottomIcon: React.FC<BottomIconProps> = ({ position, trigger, icon, animation, className }) => {
    const classAddedIcon = () => {
        return React.Children.map(icon, (child: React.ReactNode) => {
            if (!React.isValidElement(child)) {
                return child;
            }

            const iconClasses = classNames('w-full h-full', {
                'animate-little-bounce': animation === 'little-bounce',
                'animate-pulse': animation === 'pulse',
                'animate-ping': animation === 'ping',
            });

            return React.cloneElement(child as React.ReactElement, {
                className: iconClasses,
            });
        });
    };

    const classes = classNames(
        className,
        `fixed w-16 h-16 p-3 bg-black text-white rounded-full animate-fade-in z-50 cursor-pointer
            shadow-[0_0_15px_10px_rgb(255,0,0)] bottom-3 z-50`,
        {
            'left-3': position === 'left',
            'right-3': position === 'right',
        }
    );

    return (
        <div className={classes} onClick={trigger}>
            {classAddedIcon()}
        </div>
    );
};

export default BottomIcon;
