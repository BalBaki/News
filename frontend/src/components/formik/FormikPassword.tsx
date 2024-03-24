import { useState } from 'react';
import { Field, ErrorMessage, type FieldAttributes } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { cn } from '../../utils/tailwindClassNames';

type FormikPasswordProps = {
    touched?: boolean;
    error?: string | boolean;
} & FieldAttributes<any>;

const FormikPassword: React.FC<FormikPasswordProps> = (props) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { name, touched, error, className, ...rest } = props;
    const handleShowIconClick = (): void => {
        setShowPassword((current) => !current);
    };
    const classes = cn(
        'w-full border-2 mt-2 h-12 pl-2 py-2 pr-6 rounded-md outline-none',
        {
            'border-[#6B7280]': !touched,
            'border-green-500': touched && !error,
            'border-red-500': touched && error,
        },
        className
    );

    return (
        <>
            <Field type={showPassword ? 'text' : 'password'} name={name} className={classes} {...rest} />
            <div className="absolute top-12 right-2 cursor-pointer " onClick={handleShowIconClick}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <ErrorMessage name={name} component="div" className="text-sm text-red-500 h-6" />
        </>
    );
};

export default FormikPassword;
