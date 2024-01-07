import { useEffect, useState } from 'react';
import { Pagination } from 'flowbite-react';
import { useFormikContext } from 'formik';
import { useSearchMutation } from '../../store';
import NewsItem from './NewsItem';
import type { FilterSettings } from '../../types';

export const SEARCH_MUTATION_CACHE_KEY = 'shared-search';

const NewsList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, { data, error }] = useSearchMutation({
        fixedCacheKey: SEARCH_MUTATION_CACHE_KEY,
    });
    const { values } = useFormikContext<FilterSettings>();
    const onPageChange = (page: number): void => {
        console.log(page);
        setCurrentPage(page);
    };

    useEffect(() => {
        if (values.extraFilters.theguardians?.section === 'all') values.extraFilters.theguardians.section = '';

        search({ ...values, term: values.term.toLocaleLowerCase(), page: currentPage });
    }, [currentPage]);

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
                        <div className="flex justify-center items-center mb-4">
                            <Pagination
                                currentPage={data?.page || currentPage}
                                totalPages={100}
                                onPageChange={onPageChange}
                                showIcons
                            />
                        </div>
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
