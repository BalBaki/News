import { useState, useRef, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import { type RegisterForm } from '../types';
import { useRegisterMutation } from '../store';
import { useNotification } from '../hooks/use-notification';
import Button from '../components/Button';

interface PrevRegisterForm {
    name: string;
    surname: string;
    email: string;
}

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const prevFormData = useRef<PrevRegisterForm>();
    const initialValues: RegisterForm = {
        name: prevFormData?.current?.name || '',
        surname: prevFormData?.current?.surname || '',
        email: prevFormData?.current?.email || '',
        password: '',
    };
    const user = useSelector((state: RootState) => state.user);
    const [register, registerResult] = useRegisterMutation();
    const { data, isLoading, error } = registerResult;
    const notification = useNotification();

    useEffect(() => {
        if (data) {
            notification({
                type: data?.register ? 'success' : 'error',
                message: data?.register ? 'Register Success' : data?.error,
            });
        }
    }, [registerResult]);

    const formSchema = Yup.object().shape({
        name: Yup.string().required('Name Requiered'),
        surname: Yup.string().required('Surname Required'),
        email: Yup.string().required('Email required').email('Enter Valid Email'),
        password: Yup.string()
            .required('Password Required')
            .min(8, ({ min }) => `Minimum ${min} character`),
    });

    const handleShowIconClick = (): void => {
        setShowPassword((current) => !current);
    };

    if (error) return <div>Error At Register</div>;
    if (user.id || data?.register) return <Navigate to="/" replace />;

    return (
        <div className="w-full h-screen  flex justify-center items-center p-2">
            <div
                className="w-full max-w-lg bg-white px-3 py-4 rounded-md h-full max-h-[36rem] overflow-auto 
shadow-[0px_0px_25px_18px_rgba(0,0,0,0.75)]"
            >
                <div>
                    <h1 className="text-2xl font-semibold max-[300px]:text-xl">Sign up for NewsFeed</h1>
                    <div className="font-medium text-sm mt-1 max-[300px]:text-xs">
                        Create a free account or
                        <Link to="/login" className="text-[#7CACAB] ml-1">
                            to login
                        </Link>
                    </div>
                </div>
                <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={formSchema}
                        onSubmit={(values): void => {
                            const { password, ...others } = values;

                            prevFormData.current = others;
                            register(values);
                        }}
                    >
                        {({ values, isValid, dirty, errors, touched }) => (
                            <Form>
                                <div className="mt-2 h-24">
                                    <div className="font-medium">Name</div>
                                    <Field
                                        type="text"
                                        name="name"
                                        className={`w-full  border-2 mt-2 h-12 p-2 rounded-md outline-none ${
                                            touched.name || values.name
                                                ? errors.name
                                                    ? 'border-red-500'
                                                    : 'border-green-500'
                                                : ''
                                        }`}
                                    />
                                    <ErrorMessage name="name" component="div" className="text-sm text-red-500 h-6" />
                                </div>
                                <div className="mt-2 h-24">
                                    <div className="font-medium">Surname</div>
                                    <Field
                                        type="text"
                                        name="surname"
                                        className={`w-full border-2 mt-2 h-12 p-2 rounded-md outline-none ${
                                            touched.surname || values.surname
                                                ? errors.surname
                                                    ? 'border-red-500'
                                                    : 'border-green-500'
                                                : ''
                                        }`}
                                    />
                                    <ErrorMessage
                                        name="surname"
                                        component="div"
                                        className="text-sm text-red-500 h-6"
                                    />
                                </div>
                                <div className="mt-2 h-24">
                                    <div className="font-medium">Email</div>
                                    <Field
                                        type="text"
                                        name="email"
                                        className={`w-full  border-2 mt-2 h-12 p-2 rounded-md outline-none ${
                                            touched.email ? (errors.email ? 'border-red-500' : 'border-green-500') : ''
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
                                        disabled={!(isValid && dirty)}
                                        className={`w-28 h-12 text-white py-1 rounded-3xl font-semibold disabled:cursor-not-allowed ${
                                            isValid && dirty ? 'bg-green-400' : 'bg-red-500'
                                        }`}
                                        loading={isLoading}
                                    >
                                        Register
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Register;
