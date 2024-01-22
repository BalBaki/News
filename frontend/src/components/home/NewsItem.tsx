import { type News } from '../../types';

type NewsProps = {
    news: News;
};

const NewsItem: React.FC<NewsProps> = ({ news }) => {
    const { url, imageUrl, title, description } = news;

    return (
        <article className="border-2 text-justify">
            <a href={url} target="_blank" rel="noreferrer">
                <div className="flex items-center h-48">
                    <img src={imageUrl} alt={title} className="w-full h-full" loading="lazy" />
                </div>
                <div className="border-b-3 text-md">
                    <div className="line-clamp-2 font-bold " title={title}>
                        {title}
                    </div>
                    <div className="line-clamp-3" title={description}>
                        {description}
                    </div>
                </div>
            </a>
        </article>
    );
};

export default NewsItem;
