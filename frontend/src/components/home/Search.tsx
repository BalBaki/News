import { useEffect, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useSearchMutation, type RootState } from '../../store';
import Apis from '../filters/Apis';
import SortOrder from '../filters/SortOrder';
import Button from '../Button';
import ExtraFilters from '../filters/extraFilters';
import NewsList from './NewsList';
import SaveSettings from './SaveSettings';
import Dates from '../filters/Dates';
import SetQueryParams from './SetQueyParams';
import ResetFilters from '../filters/ResetFilters';
import { SEARCH_MUTATION_CACHE_KEY } from '../../utils/constants';
import { UrlParser } from '../../utils/urlparser';

const Search: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const [search, { isLoading, reset }] = useSearchMutation({ fixedCacheKey: SEARCH_MUTATION_CACHE_KEY });
    const [searchParams] = useSearchParams();
    const initialValues = useMemo(() => {
        const parsedQueryString = UrlParser(searchParams.get('filter'));

        return parsedQueryString
            ? parsedQueryString
            : user.id && Object.keys(user?.filterSettings).length > 0
            ? { term: '', ...user.filterSettings, page: 1 }
            : {
                  term: '',
                  fromDate: '',
                  toDate: new Date(),
                  apiList: [],
                  extraFilters: {},
                  page: 1,
                  sortOrder: 'relevance',
              };
    }, []);

    const formSchema = Yup.object().shape({
        term: Yup.string()
            .required('Term required')
            .max(100, ({ max }) => `Maximum ${max} character`),
        apiList: Yup.mixed<string[]>().test(
            'api-required',
            'Select Minimum 1 Api',
            (value) => value && value.length > 0
        ),
    });

    useEffect(() => {
        return () => reset();
    }, []);

    return (
        <main className="mt-4">
            <Formik
                initialValues={initialValues}
                validationSchema={formSchema}
                onSubmit={(values) => {
                    search(values);
                }}
            >
                {({ isValid, dirty }) => (
                    <>
                        <section aria-label="filters">
                            <Form>
                                <div className="mx-3 sm:w-11/12 sm:mx-auto">
                                    <div className="grid gap-3 mt-2 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
                                        <div className="w-full">
                                            <Field
                                                type="text"
                                                name="term"
                                                id="term"
                                                placeholder="Search Term"
                                                className="w-full border-2 border-[#6B7280] rounded-md py-0 px-1 !bg-black !text-white"
                                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                                    e.key === 'Enter' && e.preventDefault();
                                                }}
                                            />
                                            <ErrorMessage
                                                name="term"
                                                component="div"
                                                className="h-6 text-sm text-red-500"
                                            />
                                        </div>
                                        <Dates />
                                        <Apis />
                                        <SortOrder />
                                        <ExtraFilters />
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center justify-center gap-2 max-[300px]:text-center mt-4 mx-3">
                                    <Button
                                        type="submit"
                                        className={`w-32 h-7 rounded-md text-white  ${
                                            isValid ? 'bg-green-400' : 'bg-red-500'
                                        }`}
                                        disabled={isLoading || !isValid}
                                        loading={isLoading}
                                    >
                                        Search
                                    </Button>
                                    {user?.id && <SaveSettings />}
                                </div>
                            </Form>
                        </section>
                        <NewsList />
                        <SetQueryParams />
                        <ResetFilters />
                    </>
                )}
            </Formik>
        </main>
    );
};

export default Search;
