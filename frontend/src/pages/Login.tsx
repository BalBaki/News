import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLoginMutation, type RootState } from '../store';
import { useNotification } from '../hooks/use-notification';
import Button from '../components/Button';
import FormikPassword from '../components/formik/FormikPassword';
import NavigateHomeIcon from '../components/NavigateHomeIcon';
import ResetFormikFields from '../components/formik/ResetFormikFields';
import { type LoginForm } from '../types';

const Login: React.FC = () => {
    const initialValues: LoginForm = { email: '', password: '' };
    const user = useSelector((state: RootState) => state.user);
    const [login, { data, isLoading, error }] = useLoginMutation();
    const notification = useNotification();

    useEffect(() => {
        if (data) {
            notification({
                type: data?.login ? 'success' : 'error',
                message: data?.login ? 'Login Success' : data?.error,
            });
        }
    }, [data]);

    const formSchema = Yup.object().shape({
        email: Yup.string().required('Email required').email('Enter Valid Email'),
        password: Yup.string()
            .required('Password Required')
            .min(8, ({ min }) => `Minimum ${min} character`),
    });

    if (error) return <div>Error At Login</div>;
    if (user.id || data?.login) return <Navigate to="/" replace />;

    return (
        <>
            <main className="h-screen flex justify-center items-center p-3 bg-news-bg" aria-label="login form">
                <div className="relative w-full h-full max-w-lg max-h-[24.5rem] overflow-hidden p-[.35rem] z-50 ">
                    <div className="h-full rounded-md overflow-auto border-2 p-3 bg-black">
                        <div>
                            <h1 className="text-2xl font-semibold text-white">Login</h1>
                        </div>
                        <div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={formSchema}
                                onSubmit={(values): void => {
                                    login(values);
                                }}
                            >
                                {({ values, isValid, dirty, errors, touched }) => (
                                    <>
                                        <Form>
                                            <div className="mt-2 h-24">
                                                <div className="font-medium text-white">Email</div>
                                                <Field
                                                    type="text"
                                                    name="email"
                                                    className={`w-full  border-2 mt-2 h-12 p-2 rounded-md outline-none ${
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
                                                    className="text-sm text-red-500 h-6"
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
                                            <div className="mt-2 mb-3 flex items-center justify-center">
                                                <Button
                                                    type="submit"
                                                    disabled={!(isValid && dirty) || isLoading}
                                                    className={`w-28 h-12 py-1 text-white rounded-3xl font-semibold ${
                                                        isValid && dirty ? 'bg-green-400' : 'bg-red-500'
                                                    }`}
                                                    loading={isLoading}
                                                >
                                                    Login
                                                </Button>
                                            </div>
                                        </Form>
                                        <ResetFormikFields
                                            fields="password"
                                            condition={data?.login}
                                            isLoading={isLoading}
                                        />
                                    </>
                                )}
                            </Formik>
                        </div>
                        <div className="mt-2 text-center text-white">
                            Dont Have Account ?
                            <Link to="/register" className="underline text-[#7CACAB] ml-1">
                                Register
                            </Link>
                        </div>
                    </div>
                    <div className="absolute -top-1/2 left-[38%] w-1/4 max-w-xs h-[200%] bg-rose-950 z-[-1] animate-spin-very-slow"></div>
                </div>
            </main>
            <NavigateHomeIcon />
        </>
    );
};

export default Login;
