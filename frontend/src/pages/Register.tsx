import { useRef, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import { type RegisterForm } from '../types';
import { useRegisterMutation } from '../store';
import { useNotification } from '../hooks/use-notification';
import Button from '../components/Button';
import FormikPassword from '../components/FormikPassword';

interface PrevRegisterForm {
    name: string;
    surname: string;
    email: string;
}

const Register: React.FC = () => {
    const prevFormData = useRef<PrevRegisterForm>();
    const initialValues: RegisterForm = {
        name: prevFormData?.current?.name || '',
        surname: prevFormData?.current?.surname || '',
        email: prevFormData?.current?.email || '',
        password: '',
    };
    const user = useSelector((state: RootState) => state.user);
    const [register, { data, isLoading, error }] = useRegisterMutation();
    const notification = useNotification();

    useEffect(() => {
        if (data) {
            notification({
                type: data?.register ? 'success' : 'error',
                message: data?.register ? 'Register Success' : data?.error,
            });
        }
    }, [data]);

    const formSchema = Yup.object().shape({
        name: Yup.string().required('Name Requiered'),
        surname: Yup.string().required('Surname Required'),
        email: Yup.string().required('Email required').email('Enter Valid Email'),
        password: Yup.string()
            .required('Password Required')
            .min(8, ({ min }) => `Minimum ${min} character`),
    });

    if (error) return <div>Error At Register</div>;
    if (user.id || data?.register) return <Navigate to="/" replace />;

    return (
        <main className="flex justify-center items-center w-full h-screen p-3 bg-news-bg" aria-label="register form">
            <div className="relative w-full h-full max-w-lg max-h-[37rem] overflow-hidden rounded-md p-[.35rem] z-50">
                <div className="w-full h-full bg-white rounded-md overflow-auto border-2 z-50 p-3">
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
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="text-sm text-red-500 h-6"
                                        />
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
                                                touched.email
                                                    ? errors.email
                                                        ? 'border-red-500'
                                                        : 'border-green-500'
                                                    : ''
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-sm  text-red-500 h-6"
                                        />
                                    </div>
                                    <div className="mt-2 relative h-24">
                                        <div className="font-medium">Password</div>
                                        <FormikPassword
                                            name="password"
                                            touched={touched.password}
                                            error={errors.password}
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
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="absolute -top-1/2 left-[38%] w-1/4 max-w-xs h-[200%] bg-rose-950 z-[-1] animate-spin-very-slow"></div>
            </div>
        </main>
    );
};

export default Register;
