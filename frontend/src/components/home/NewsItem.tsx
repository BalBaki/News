import { useMemo } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useChangeFavoriteMutation, type RootState } from '../../store';
import { type News } from '../../types';

type NewsProps = {
    news: News;
    colors?: { [key: string]: string };
};

const NewsItem: React.FC<NewsProps> = ({ news, colors }) => {
    const { favorites } = useSelector((state: RootState) => state.user);
    const { url, imageUrl, title, description } = news;
    const [addFavorite] = useChangeFavoriteMutation();
    const randomNumber = useMemo(() => Math.random(), []);
    const isFavorite = useMemo(() => favorites.find((favoriteNews) => favoriteNews.url === news.url), [favorites]);
    const BookMark = isFavorite ? FaBookmark : FaRegBookmark;

    const handleChangeFavoritesClick = () => {
        addFavorite({ type: isFavorite ? 'remove' : 'add', news });
    };

    const renderedParts = [
        <div className="flex flex-row-reverse relative rounded-xl" key="firstPart">
            <div className="w-[60%] h-36 m-2 rounded-full border-2 overflow-hidden relative">
                <img src={imageUrl} alt={title} className="w-full h-full" loading="lazy" />
                <div className={`absolute inset-0 ${colors?.imageFilterBg}`}></div>
            </div>
        </div>,
        <div className="border-b-3 text-md px-4 mt-2" key="secondPart">
            <div className="line-clamp-4 top-5 font-bold text-xl uppercase w-full h-28" title={title}>
                {title}
            </div>
            <div className="h-24 line-clamp-[6] text-sm leading-4 my-3" title={description}>
                {description}
            </div>
        </div>,
    ];

    if (randomNumber > 0.5) [renderedParts[0], renderedParts[1]] = [renderedParts[1], renderedParts[0]];

    return (
        <article className="border-2 rounded-2xl border-black bg-white w-[16.6rem] relative group">
            <a href={url} target="_blank" rel="noreferrer">
                <div className="h-full w-full p-2">{renderedParts}</div>
            </a>
            <div
                className={`absolute w-9 h-9 bg-red-400 rounded-full p-2 z-10 ${
                    randomNumber > 0.5 ? 'left-[35%] bottom-5' : 'top-4 right-4'
                } opacity-0 group-hover:opacity-100 transition-opacity`}
            >
                <BookMark className="w-full h-full cursor-pointer text-black" onClick={handleChangeFavoritesClick} />
            </div>
        </article>
    );
};

export default NewsItem;
