import { useEffect, useState } from 'react';
import { Pagination } from 'flowbite-react';
import { useFormikContext } from 'formik';
import './NewsList.css';
import { useSearchMutation } from '../../store';
import NewsItem from './NewsItem';
import type { FilterSettings } from '../../types';
import Loading from '../Loading';
import { SEARCH_MUTATION_CACHE_KEY, ARTICLE_PER_PAGE } from '../../utils/constants';

const NewsList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, { data, error, isLoading, isUninitialized }] = useSearchMutation({
        fixedCacheKey: SEARCH_MUTATION_CACHE_KEY,
    });
    const { values } = useFormikContext<FilterSettings>();

    const onPageChange = (page: number): void => setCurrentPage(page);

    useEffect(() => {
        if (!isUninitialized && values.term) {
            search({ ...values, term: values.term.toLocaleLowerCase(), page: currentPage });
        }
    }, [currentPage]);

    useEffect(() => {
        if (data?.search) setCurrentPage(data.page);
    }, [data]);

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

    return (
        <main className="mt-6">
            {data?.search ? (
                data.articles.length > 0 ? (
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 max-[450px]:grid-cols-1 gap-3 mx-3">
                            {renderedNews}
                        </div>
                        {data.totalArticleCount > ARTICLE_PER_PAGE && (
                            <div className="flex justify-center items-center mb-4 pagination">
                                <Pagination
                                    currentPage={data?.page || currentPage}
                                    totalPages={Math.ceil(data?.totalArticleCount / ARTICLE_PER_PAGE)}
                                    onPageChange={onPageChange}
                                    previousLabel=""
                                    nextLabel=""
                                    showIcons
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    'No News Found'
                )
            ) : (
                ''
            )}
        </main>
    );
};

export default NewsList;
