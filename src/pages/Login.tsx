import { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { type LoginForm } from '../types';
import { useLoginMutation, type RootState } from '../store';
import { useNotification } from '../hooks/use-notification';
import Button from '../components/Button';

interface PrevLoginForm {
    email: string;
}

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const prevFormData = useRef<PrevLoginForm>();
    const initialValues: LoginForm = { email: prevFormData?.current?.email || '', password: '' };
    const user = useSelector((state: RootState) => state.user);
    const [login, loginResult] = useLoginMutation();
    const notification = useNotification();
    const { data, isLoading, error } = loginResult;

    useEffect(() => {
        if (data) {
            notification({
                type: data?.login ? 'success' : 'error',
                message: data?.login ? 'Login Success' : data?.error,
            });
        }
    }, [loginResult]);

    const formSchema = Yup.object().shape({
        email: Yup.string().required('Email required').email('Enter Valid Email'),
        password: Yup.string()
            .required('Password Required')
            .min(8, ({ min }) => `Minimum ${min} character`),
    });

    const handleShowIconClick = (): void => {
        setShowPassword((current) => !current);
    };

    if (error) return <div>Error At Login</div>;
    if (user.id || data?.login) return <Navigate to="/" replace />;

    return (
        <main className="w-full h-screen flex justify-center items-center p-2" aria-label="login form">
            <div
                className="w-full max-w-lg bg-white px-3 py-4 rounded-md h-full max-h-[23.5rem] overflow-auto 
shadow-[0px_0px_25px_18px_rgba(0,0,0,0.75)]"
            >
                <div>
                    <h1 className="text-2xl font-semibold">Login</h1>
                </div>
                <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={formSchema}
                        onSubmit={(values): void => {
                            const { password, ...others } = values;

                            prevFormData.current = others;

                            login(values);
                        }}
                    >
                        {({ values, isValid, dirty, errors, touched }) => (
                            <Form>
                                <div className="mt-2 h-24">
                                    <div className="font-medium">Email</div>
                                    <Field
                                        type="text"
                                        name="email"
                                        className={`w-full  border-2 mt-2 h-12 p-2 rounded-md outline-none ${
                                            touched.email || values.email
                                                ? errors.email
                                                    ? 'border-red-500'
                                                    : 'border-green-500'
                                                : ''
                                        }`}
                                    />
                                    <ErrorMessage name="email" component="div" className="text-sm  text-red-500 h-6" />
                                </div>
                                <div className="mt-2 relative h-24">
                                    <div className="font-medium">Password</div>
                                    <Field
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        className={`w-full border-2 mt-2 h-12 pl-2 py-2 pr-6 rounded-md outline-none ${
                                            touched.password
                                                ? errors.password
                                                    ? 'border-red-500'
                                                    : 'border-green-500'
                                                : ''
                                        }`}
                                    />
                                    <div
                                        className="absolute top-12 right-2 cursor-pointer"
                                        onClick={handleShowIconClick}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-sm text-red-500 h-6"
                                    />
                                </div>
                                <div className="mt-2 mb-3 flex items-center justify-center">
                                    <Button
                                        type="submit"
                                        disabled={!(isValid && dirty) || isLoading}
                                        className={`w-28 h-12 py-1 text-white rounded-3xl font-semibold disabled:cursor-not-allowed ${
                                            isValid && dirty ? 'bg-green-400' : 'bg-red-500'
                                        }`}
                                        loading={isLoading}
                                    >
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="mt-2 text-center">
                    Dont Have Account ?
                    <Link to="/register" className="underline text-[#7CACAB] ml-1">
                        Register
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Login;
