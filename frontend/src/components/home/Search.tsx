import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useSearchMutation, type RootState } from '../../store';
import { type FilterSettings } from '../../types';
import Apis from '../filters/Apis';
import SortOrder from '../filters/SortOrder';
import Button from '../Button';
import ExtraFilters from '../filters/extraFilters';
import NewsList from './NewsList';
import SaveSettings from './SaveSettings';
import ResetFilters from '../filters/ResetFilters';
import Dates from '../filters/Dates';
import { SEARCH_MUTATION_CACHE_KEY } from '../../utils/constants';

const Search: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const [search, { isLoading }] = useSearchMutation({ fixedCacheKey: SEARCH_MUTATION_CACHE_KEY });
    const initialValues: FilterSettings = {
        term: '',
        fromDate: user?.filterSettings?.fromDate || '',
        toDate: user?.filterSettings?.toDate || new Date(),
        apiList: user?.filterSettings?.apiList?.length > 0 ? user?.filterSettings?.apiList : [],
        extraFilters: { ...user?.filterSettings?.extraFilters } || {},
        page: 1,
        sortOrder: user?.filterSettings?.sortOrder || 'relevance',
    };

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
                                <div className="sm:w-11/12 sm:mx-auto mx-3">
                                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 justify-items-center mt-2">
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
                                                className="text-sm  text-red-500 h-6"
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
                                            isValid && dirty ? 'bg-green-400' : 'bg-red-500'
                                        }`}
                                        disabled={isLoading || !(isValid && dirty)}
                                        loading={isLoading}
                                    >
                                        Search
                                    </Button>
                                    {user?.id && <SaveSettings />}
                                </div>
                            </Form>
                        </section>
                        <NewsList />
                    </>
                )}
            </Formik>
        </main>
    );
};

export default Search;
