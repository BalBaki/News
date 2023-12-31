import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { TbCircleDotted } from 'react-icons/tb';

type ButtonProps = {
    loading?: boolean;
    className?: string;
} & React.ComponentPropsWithoutRef<'button'>;

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ loading = false, children, className = '', ...rest }) => {
    const classes = classNames(className);

    return (
        <button {...rest} className={classes}>
            {loading ? <TbCircleDotted className="w-full h-3/4 animate-spin-slow" /> : children}
        </button>
    );
};

export default Button;
