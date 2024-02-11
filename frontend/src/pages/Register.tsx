import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import FormikPassword from '../components/formik/FormikPassword';
import NavigateHomeIcon from '../components/NavigateHomeIcon';
import ResetFormikFields from '../components/formik/ResetFormikFields';
import Error from '../components/Error';
import { useRegisterMutation } from '../store';
import { useNotification } from '../hooks/use-notification';
import { type RootState } from '../store';
import { type RegisterForm } from '../types';

const Register: React.FC = () => {
    const initialValues: RegisterForm = {
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const user = useSelector((state: RootState) => state.user);
    const [register, { data, isLoading, error }] = useRegisterMutation();
    const notification = useNotification();

    useEffect(() => {
        if (data) {
            notification({
                type: data.register ? 'success' : 'error',
                message: data.register ? 'Register Success' : data.error,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const formSchema = Yup.object().shape({
        name: Yup.string().required('Name Requiered'),
        surname: Yup.string().required('Surname Required'),
        email: Yup.string().required('Email required').email('Enter Valid Email'),
        password: Yup.string()
            .required('Password Required')
            .min(8, ({ min }) => `Minimum ${min} character`),
        confirmPassword: Yup.string()
            .required('Confirm Password Required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
    });

    if (error) return <Error previousPageButton>Error At Register</Error>;
    if (user.id || data?.register) return <Navigate to="/" replace />;

    return (
        <>
            <main
                className="flex justify-center items-center h-screen p-3 bg-news-bg bg-cover"
                aria-label="register form"
            >
                <div className="relative w-full h-full max-w-lg max-h-[43.5rem] overflow-hidden p-[.35rem] z-50">
                    <div className="h-full bg-black border-2 p-3 overflow-auto rounded-md">
                        <div className="text-white">
                            <h1 className="text-2xl font-semibold max-[300px]:text-xl ">Sign up for NewsFeed</h1>
                            <div className="font-medium text-sm mt-1 max-[300px]:text-xs">
                                Create a free account or
                                <Link to="/login" className="text-[#7CACAB] ml-1">
                                    to login
                                </Link>
                            </div>
                        </div>
                        <div className="">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={formSchema}
                                onSubmit={(values): void => {
                                    register(values);
                                }}
                            >
                                {({ values, isValid, dirty, errors, touched }) => (
                                    <>
                                        <Form>
                                            <div className="mt-2 h-24">
                                                <div className="font-medium text-white">Name</div>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    className={`w-full border-2 mt-2 h-12 p-2 rounded-md outline-none ${
                                                        touched.name || values.name
                                                            ? errors.name
                                                                ? 'border-red-500'
                                                                : 'border-green-500'
                                                            : 'border-[#6B7280]'
                                                    }`}
                                                />
                                                <ErrorMessage
                                                    name="name"
                                                    component="div"
                                                    className="text-sm text-red-500 h-6"
                                                />
                                            </div>
                                            <div className="mt-2 h-24">
                                                <div className="font-medium text-white">Surname</div>
                                                <Field
                                                    type="text"
                                                    name="surname"
                                                    className={`w-full border-2 mt-2 h-12 p-2 rounded-md outline-none ${
                                                        touched.surname || values.surname
                                                            ? errors.surname
                                                                ? 'border-red-500'
                                                                : 'border-green-500'
                                                            : 'border-[#6B7280]'
                                                    }`}
                                                />
                                                <ErrorMessage
                                                    name="surname"
                                                    component="div"
                                                    className="text-sm text-red-500 h-6"
                                                />
                                            </div>
                                            <div className="mt-2 h-24">
                                                <div className="font-medium text-white">Email</div>
                                                <Field
                                                    type="text"
                                                    name="email"
                                                    className={`w-full border-2 mt-2 h-12 p-2 rounded-md outline-none ${
                                                        touched.email || values.email
                                                            ? errors.email
                                                                ? 'border-red-500'
                                                                : 'border-green-500'
                                                            : 'border-[#6B7280]'
                                                    }`}
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="text-sm  text-red-500 h-6"
                                                />
                                            </div>
                                            <div className="mt-2 relative h-24">
                                                <div className="font-medium text-white">Password</div>
                                                <FormikPassword
                                                    name="password"
                                                    touched={touched.password}
                                                    error={errors.password}
                                                />
                                            </div>
                                            <div className="mt-2 relative h-24">
                                                <div className="font-medium text-white">Confirm Password</div>
                                                <FormikPassword
                                                    name="confirmPassword"
                                                    touched={touched.confirmPassword}
                                                    error={errors.confirmPassword}
                                                />
                                            </div>
                                            <div className="mt-2 mb-3 flex items-center justify-center">
                                                <Button
                                                    type="submit"
                                                    disabled={isLoading || !(isValid && dirty)}
                                                    className={`w-28 h-12 text-white py-1 rounded-3xl font-semibold ${
                                                        isValid && dirty ? 'bg-green-400' : 'bg-red-500'
                                                    }`}
                                                    loading={isLoading}
                                                >
                                                    Register
                                                </Button>
                                            </div>
                                        </Form>
                                        <ResetFormikFields
                                            fields={['password', 'confirmPassword']}
                                            condition={data?.register}
                                            isLoading={isLoading}
                                        />
                                    </>
                                )}
                            </Formik>
                        </div>
                    </div>
                    <div className="absolute -top-1/2 left-[38%] w-1/4 max-w-xs h-[200%] bg-rose-950 z-[-1] animate-spin-very-slow"></div>
                </div>
            </main>
            <NavigateHomeIcon />
        </>
    );
};

export default Register;
