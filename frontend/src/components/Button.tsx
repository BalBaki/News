import { type PropsWithChildren } from 'react';
import classNames from 'classnames';
import { TbCircleDotted } from 'react-icons/tb';

type ButtonProps = {
    loading?: boolean;
    className?: string;
} & React.ComponentPropsWithoutRef<'button'>;

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    loading = false,
    children,
    className = '',
    disabled,
    ...rest
}) => {
    const classes = classNames(className, {
        'cursor-progress': loading && disabled,
        'cursor-not-allowed': !loading && disabled,
    });

    return (
        <button {...rest} className={classes} disabled={disabled}>
            {loading ? <TbCircleDotted className="w-full h-3/4 animate-spin-slow" /> : children}
        </button>
    );
};

export default Button;
