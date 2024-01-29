import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import NewsItem from '../components/home/NewsItem';

const Favorites: React.FC = () => {
    const { favorites } = useSelector((state: RootState) => state.user);

    return (
        <div className="flex flex-wrap justify-center sm:justify-evenly gap-3 animate-sliding-from-right-to-left my-2">
            {favorites?.map((news) => (
                <NewsItem news={news} key={news.id} />
            ))}
        </div>
    );
};

export default Favorites;
