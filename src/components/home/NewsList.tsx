import { useSearchMutation } from '../../store';
import NewsItem from './NewsItem';

export const SEARCH_MUTATION_CACHE_KEY = 'shared-search';

const NewsList: React.FC = () => {
    const [search, { data, error }] = useSearchMutation({
        fixedCacheKey: SEARCH_MUTATION_CACHE_KEY,
    });

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
