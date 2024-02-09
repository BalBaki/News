import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Button from './Button';

type ErrorProps = {
    previousButton?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
};

const Error: React.FC<PropsWithChildren<ErrorProps>> = ({ children, previousButton, className, size = 'md' }) => {
    const navigate = useNavigate();

    const handleBackButtonClick = () => navigate(-1);

    const classes = classNames('h-full w-full text-center max-sm:scale-100', className, {
        'scale-[0.6] sm:-mt-9': size === 'xs',
        'scale-[0.8] sm:-mt-7': size === 'sm',
        'scale-[1.2] sm:mt-4': size === 'lg',
        'scale-[1.4] sm:mt-9': size === 'xl',
    });

    return (
        <div className={classes}>
            <div className="text-center flex justify-center">
                <div className="bg-error-bg bg-clip-text bg-no-repeat bg-cover text-7xl sm:text-[9rem] text-transparent font-extrabold">
                    Oops!
                </div>
            </div>
            <div className="mt-2 flex justify-center">
                <div>
                    <div className="text-md sm:text-2xl font-bold  max-w-[14rem] sm:max-w-md break-all mx-2">
                        {children}
                    </div>
                    {previousButton && (
                        <Button
                            className="text-md uppercase mt-2 font-normal bg-blue-700 py-2 px-4 sm:py-3 sm:px-6 
                            rounded-3xl text-white shadow-[0px_5px_2px_3px] shadow-blue-950"
                            onClick={handleBackButtonClick}
                        >
                            Go to Previous Page
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Error;
