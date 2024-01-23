import { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type FormikPasswordProps = {
    name: string;
    touched?: boolean;
    error?: string;
};

const FormikPassword: React.FC<FormikPasswordProps> = ({ name, touched, error }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleShowIconClick = (): void => {
        setShowPassword((current) => !current);
    };

    return (
        <>
            <Field
                type={showPassword ? 'text' : 'password'}
                name={name}
                className={`w-full border-2 mt-2 h-12 pl-2 py-2 pr-6 rounded-md outline-none ${
                    touched ? (error ? 'border-red-500' : 'border-green-500') : ''
                }`}
            />
            <div className="absolute top-12 right-2 cursor-pointer " onClick={handleShowIconClick}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <ErrorMessage name="password" component="div" className="text-sm text-red-500 h-6" />
        </>
    );
};

export default FormikPassword;
