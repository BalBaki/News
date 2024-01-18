import { Pagination } from 'flowbite-react';
import { useFormikContext } from 'formik';
import './NewsList.css';
import { useSearchMutation } from '../../store';
import NewsItem from './NewsItem';
import { type FilterSettings } from '../../types';
import Loading from '../Loading';
import { SEARCH_MUTATION_CACHE_KEY, ITEMS_PER_API } from '../../utils/constants';

const NewsList: React.FC = () => {
    const [search, { data, error, isLoading }] = useSearchMutation({
        fixedCacheKey: SEARCH_MUTATION_CACHE_KEY,
    });
    const { values, isValid } = useFormikContext<FilterSettings>();

    const onPageChange = (page: number): void => {
        if (!isValid || page === data?.page) return;

        search({ ...values, term: values.term.toLocaleLowerCase(), page });
    };

    if (isLoading)
        return (
            <div className="h-80">
                <Loading />
            </div>
        );
    if (error || data?.error) return <div>Error At Fetching News</div>;

    const renderedNews = data?.articles?.map((article) => {
        return <NewsItem key={article.id} news={article} />;
    });
    const articlesCountPerPage = ITEMS_PER_API * values.apiNames.length;

    return (
        <section className="mt-6" aria-label="news">
            {data?.search ? (
                data.articles.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 max-[450px]:grid-cols-1 gap-3 mx-3">
                            {renderedNews}
                        </div>
                        {(data.totalArticleCount > articlesCountPerPage ||
                            data.totalArticleCount > data.articles.length) && (
                            <div className="flex justify-center items-center mb-4 pagination">
                                <Pagination
                                    currentPage={data.page}
                                    totalPages={Math.ceil(
                                        data.totalArticleCount < articlesCountPerPage
                                            ? data.totalArticleCount / ((values.apiNames.length - 1) * ITEMS_PER_API)
                                            : data.totalArticleCount / articlesCountPerPage
                                    )}
                                    onPageChange={onPageChange}
                                    previousLabel=""
                                    nextLabel=""
                                    showIcons
                                />
                            </div>
                        )}
                    </>
                ) : (
                    'No News Found'
                )
            ) : (
                ''
            )}
        </section>
    );
};

export default NewsList;
