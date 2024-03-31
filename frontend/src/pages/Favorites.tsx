import { useFetchFavoritesQuery } from '../store';
import NewsItem from '../components/home/NewsItem';
import Loading from '../components/Loading';

const Favorites: React.FC = () => {
    const { data, isLoading, error } = useFetchFavoritesQuery();

    if (isLoading)
        return (
            <div className="h-96">
                <Loading />
            </div>
        );
    if (error || data?.error) return <div className="ml-3">Error At Fetching News</div>;

    return (
        <div className="mx-2 min-[330px]:mx-5">
            <h3 className="text-3xl font-bold border-b-2 border-black mt-2">Favorites</h3>
            <div
                className="grid min-[630px]:grid-cols-2 min-[920px]:grid-cols-3 min-[1200px]:grid-cols-4 
                min-[1475px]:grid-cols-5  gap-3 my-4
                justify-items-center animate-sliding-from-right-to-left"
            >
                {data?.success && data.favorites.map((news) => <NewsItem news={news} key={news.id} />)}
            </div>
        </div>
    );
};

export default Favorites;
