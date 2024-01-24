import { useEffect, useState } from 'react';
import { Pagination } from 'flowbite-react';
import { useFormikContext } from 'formik';
import { useLocation } from 'react-router-dom';
import './NewsList.css';
import { useSearchMutation, useFetchApisQuery } from '../../store';
import NewsItem from './NewsItem';
import { type FilterSettings } from '../../types';
import Loading from '../Loading';
import Button from '../Button';
import { SEARCH_MUTATION_CACHE_KEY, ITEMS_PER_API } from '../../utils/constants';

const NewsList: React.FC = () => {
    const [pageNum, setPageNum] = useState<number>(1);
    const [search, { data, error, isLoading, reset }] = useSearchMutation({
        fixedCacheKey: SEARCH_MUTATION_CACHE_KEY,
    });
    const { data: apiData } = useFetchApisQuery();
    const { values, isValid } = useFormikContext<FilterSettings>();
    const location = useLocation();
    const maxPage = Math.ceil((data?.maxNewsCount || 0) / ITEMS_PER_API);

    const onPageChange = (page: number): void => {
        if (!isValid || page === data?.page) return;

        search({ ...values, term: values.term.toLocaleLowerCase(), page });
    };
    const handlePageGoClick = (): void => {
        if (!isValid || pageNum === data?.page) return;

        search({ ...values, term: values.term.toLocaleLowerCase(), page: pageNum });
    };
    const handlePageNumChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(event.target.value);

        setPageNum(value > 1 ? (value > maxPage ? maxPage : value) : 1);
    };

    useEffect(() => {
        data?.search && setPageNum(data.page);
    }, [data]);

    useEffect(() => {
        reset();
    }, [location]);

    if (isLoading)
        return (
            <div className="h-64">
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
                            <div className="text-center mb-[5rem] sm:mb-4 mt-2">
                                <div className="pagination">
                                    <Pagination
                                        currentPage={data.page}
                                        totalPages={maxPage}
                                        onPageChange={onPageChange}
                                        previousLabel=""
                                        nextLabel=""
                                        showIcons
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        className="page-num border border-gray-300 w-16 p-0 mt-2 text-center rounded-md"
                                        min="1"
                                        max={maxPage}
                                        value={pageNum}
                                        onChange={handlePageNumChange}
                                    />
                                    <Button
                                        className="px-4 ml-2 border border-gray-300 rounded-md"
                                        onClick={handlePageGoClick}
                                    >
                                        Go
                                    </Button>
                                </div>
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
