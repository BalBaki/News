import { type PropsWithChildren } from 'react';
import { TbCircleDotted } from 'react-icons/tb';
import { cn } from '../utils/tailwindClassNames';

type ButtonProps = {
    loading?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    loading = false,
    children,
    className = '',
    disabled,
    ...rest
}) => {
    const classes = cn(
        {
            'cursor-progress': loading && disabled,
            'cursor-not-allowed': !loading && disabled,
        },
        className
    );

    return (
        <button {...rest} className={classes} disabled={disabled}>
            {loading ? <TbCircleDotted className="w-full h-3/4 animate-spin-slow" /> : children}
        </button>
    );
};

export default Button;
