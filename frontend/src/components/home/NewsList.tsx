import { Pagination } from 'flowbite-react';
import { useFormikContext } from 'formik';
import { useLocation } from 'react-router-dom';
import './NewsList.css';
import { useSearchMutation, useFetchApisQuery } from '../../store';
import NewsItem from './NewsItem';
import { type FilterSettings } from '../../types';
import Loading from '../Loading';
import { SEARCH_MUTATION_CACHE_KEY, ITEMS_PER_API } from '../../utils/constants';
import { useEffect } from 'react';

const NewsList: React.FC = () => {
    const [search, { data, error, isLoading, reset }] = useSearchMutation({
        fixedCacheKey: SEARCH_MUTATION_CACHE_KEY,
    });
    const { data: apiData } = useFetchApisQuery();
    const { values, isValid } = useFormikContext<FilterSettings>();
    const location = useLocation();

    const onPageChange = (page: number): void => {
        if (!isValid || page === data?.page) return;

        search({ ...values, term: values.term.toLocaleLowerCase(), page });
    };

    useEffect(() => {
        reset();
    }, [location]);

    if (isLoading)
        return (
            <div className="h-80">
                <Loading />
            </div>
        );
    if (error || data?.error) return <div className="ml-3">Error At Fetching News</div>;

    let renderedNews;

    if (data?.articles) {
        renderedNews = Object.keys(data.articles).map((apiName) => {
            const renderedArticles = data.articles[apiName].map((article) => {
                return <NewsItem key={article.id} news={article} />;
            });

            return (
                <div key={apiName}>
                    <div className="capitalize text-2xl border-b-4 border-black italic pb-1 mt-3">
                        {apiData?.apis?.find((api) => api.value === apiName)?.name || apiName}
                    </div>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 
                            gap-3 mt-1"
                    >
                        {renderedArticles}
                    </div>
                </div>
            );
        });
    }

    return (
        <section className="mt-6 mx-3" aria-label="news">
            {data?.search ? (
                Object.keys(data.articles).length > 0 ? (
                    <>
                        {renderedNews}
                        {data.maxNewsCount > ITEMS_PER_API && (
                            <div className="flex justify-center items-center mb-4 mt-2 pagination">
                                <Pagination
                                    currentPage={data.page}
                                    totalPages={Math.ceil(data.maxNewsCount / ITEMS_PER_API)}
                                    onPageChange={onPageChange}
                                    previousLabel=""
                                    nextLabel=""
                                    showIcons
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="ml-3">No News Found</div>
                )
            ) : (
                ''
            )}
        </section>
    );
};

export default NewsList;
