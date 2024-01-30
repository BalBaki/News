import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import NewsItem from '../components/home/NewsItem';

const Favorites: React.FC = () => {
    const { favorites } = useSelector((state: RootState) => state.user);

    return (
        <div className="grid min-[630px]:grid-cols-2 min-[920px]:grid-cols-3 min-[1200px]:grid-cols-4 min-[1475px]:grid-cols-5 mx-2 min-[330px]:mx-5 gap-3 my-4 justify-items-center animate-sliding-from-right-to-left ">
            {favorites?.map((news) => (
                <NewsItem news={news} key={news.id} />
            ))}
        </div>
    );
};

export default Favorites;
