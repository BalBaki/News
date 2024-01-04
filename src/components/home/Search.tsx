import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useSearchMutation, type RootState } from '../../store';
import { type FilterSettings } from '../../types';
import Apis from '../form/Apis';
import Button from '../Button';
import ExtraFilters from '../form/ExtraFilters';

const Search: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const [search, searchResult] = useSearchMutation();
    const initialValues: FilterSettings = {
        term: '',
        fromDate: user.filterSettings.fromDate || '',
        toDate: user.filterSettings.toDate || new Date().toISOString().split('T')[0],
        apiNames: user.filterSettings.apiNames.length > 0 ? user.filterSettings.apiNames : [],
        extraFilters: {},
    };

    const formSchema = Yup.object().shape({
        term: Yup.string()
            .required('Term required')
            .max(100, ({ max }) => `Maximum ${max} character`),
        apiNames: Yup.mixed<string[]>().test(
            'api-required',
            'Select Minimum 1 Api',
            (value) => value && value.length > 0
        ),
    });

    return (
        <div>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={formSchema}
                    onSubmit={(values) => {
                        // search({
                        //     ...values,
                        //     term: values.term.toLocaleLowerCase(),
                        //     // section: values.section === 'all' ? '' : values.section,
                        // });
                    }}
                >
                    {({ values, isValid, dirty }) => (
                        <>
                            <Form>
                                <div>
                                    <div className="flex flex-wrap gap-2 justify-center items-center px-2 max-[340px]:block mt-2">
                                        <div className="w-full max-w-[30rem] h-12">
                                            <Field
                                                type="text"
                                                name="term"
                                                id="term"
                                                placeholder="Search Term"
                                                className="w-full border-2 px-1"
                                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                                    e.key === 'Enter' && e.preventDefault();
                                                }}
                                            />
                                            <ErrorMessage
                                                name="term"
                                                component="div"
                                                className="text-sm  text-red-500 h-6"
                                            />
                                        </div>
                                        <div className="flex h-12 max-[340px]:block max-[340px]:h-20 max-[340px]:text-center">
                                            <div>
                                                <label htmlFor="fromDate">From: </label>
                                                <Field
                                                    type="date"
                                                    name="fromDate"
                                                    id="fromDate"
                                                    className="border-2"
                                                    max={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                            <div className="ml-2 max-[340px]:mt-2">
                                                <label htmlFor="toDate">To: </label>
                                                <Field
                                                    type="date"
                                                    name="toDate"
                                                    id="toDate"
                                                    className="border-2"
                                                    max={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                        </div>
                                        <Apis />
                                        <ExtraFilters />
                                    </div>
                                    {/* <div className="flex flex-wrap items-center justify-center gap-2 px-2 max-sm:block">
                                        {values.apis.indexOf('newsapi') > -1 && (
                                            <Sources checkedSources={values.sources} />
                                        )}
                                        {values.apis.indexOf('theguardians') > -1 && (
                                            <Sections selectedSection={values.section} />
                                        )}
                                    </div> */}
                                </div>
                                <div className="flex flex-wrap items-center justify-center max-[300px]:block max-[300px]:text-center mt-2">
                                    <Button
                                        type="submit"
                                        className={`w-36 h-7 rounded-md text-white disabled:cursor-not-allowed ${
                                            isValid && dirty ? 'bg-green-400' : 'bg-red-500'
                                        }`}
                                        disabled={searchResult.isLoading || !(isValid && dirty)}
                                        loading={searchResult.isLoading}
                                    >
                                        Search
                                    </Button>
                                    {/* {user?.id && <SaveSettings settings={values} />} */}
                                </div>
                            </Form>
                        </>
                    )}
                </Formik>
            </div>
            {/* <NewsList searchResult={searchResult} /> */}
        </div>
    );
};

export default Search;
