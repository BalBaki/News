import './NewsList.css';
import { useSearchMutation } from '../../store';
import Loading from '../Loading';
import NewsListPart from './NewsListPart';
import { SEARCH_MUTATION_CACHE_KEY } from '../../utils/constants';

const NewsList: React.FC = () => {
    const [, { data, error, isLoading }] = useSearchMutation({
        fixedCacheKey: SEARCH_MUTATION_CACHE_KEY,
    });

    if (isLoading)
        return (
            <div className="h-64">
                <Loading />
            </div>
        );
    if (error || data?.error) return <div className="ml-3">Error At Fetching News</div>;

    let renderedNews;

    if (data?.search) {
        renderedNews = Object.keys(data.articles).map((api) => {
            return <NewsListPart api={api} key={api} />;
        });
    }

    return (
        <section className="mt-6 mx-1 min-[281px]:mx-3" aria-label="news">
            {data?.search ? (
                Object.keys(data.articles).length > 0 ? (
                    <>{renderedNews}</>
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
