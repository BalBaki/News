import { useEffect, useState, useRef } from 'react';
import { useFormikContext } from 'formik';
import { useLazySearchQuery, useFetchApisQuery } from '../../store';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Loading from '../Loading';
import NewsItem from './NewsItem';
import { type News, type FilterSettings } from '../../types';
import { NEWS_API_VALUE, THE_GUARDIANS_API_VALUE, THE_NEW_YORK_TIMES_VALUE } from '../../utils/constants';
import Button from '../Button';
import classNames from 'classnames';

type NewsListPartProps = {
    api: string;
    newsListData: {
        count: number;
        result: News[];
    };
};

const articleColors = {
    [NEWS_API_VALUE]: {
        imageFilterBg: 'bg-[rgba(255,111,97,0.4)]',
        bookMarkIconBg: 'bg-[rgba(255,111,97,1)]',
    },
    [THE_GUARDIANS_API_VALUE]: {
        imageFilterBg: 'bg-[rgba(102,103,171,0.4)]',
        bookMarkIconBg: 'bg-[rgba(102,103,171,1)]',
    },
    [THE_NEW_YORK_TIMES_VALUE]: {
        imageFilterBg: 'bg-[rgba(69,181,170,0.4)]',
        bookMarkIconBg: 'bg-[rgba(69,181,170,1)]',
    },
};
const ITEMS_PER_API = 10;

const NewsListPart: React.FC<NewsListPartProps> = ({ api, newsListData }) => {
    const [page, setPage] = useState<number>(1);
    const previousPageNum = useRef<number>(1);
    const { values, isValid } = useFormikContext<FilterSettings>();
    const { data: apiData } = useFetchApisQuery();
    const [search, { data, isFetching, error, isUninitialized }] = useLazySearchQuery();

    useEffect(() => {
        if (!isValid || (page === 1 && isUninitialized)) return;

        search({ ...values, page, apiList: [api], extraFilters: { [api]: values.extraFilters[api] } });
    }, [page]);

    const handleNavigationArrows = (direction: 'next' | 'previous') => {
        previousPageNum.current = page;

        if (direction === 'next') setPage((c) => c + 1);
        else if (direction === 'previous') setPage((c) => c - 1);
    };

    let content;

    if (isFetching)
        content = (
            <div className="h-64">
                <Loading />
            </div>
        );
    else if (error || data?.error) content = <div className="ml-3">Error At Fetching News</div>;
    else {
        const articles = data?.articles?.[api]?.result || newsListData.result;
        const renderedNews = articles?.map((article) => {
            return <NewsItem key={article.id} news={article} colors={articleColors[api]} />;
        });

        const classes = classNames(
            'grid min-[630px]:grid-cols-2 min-[920px]:grid-cols-3 min-[1200px]:grid-cols-4 min-[1475px]:grid-cols-5 min-[330px]:mx-5 gap-3 mt-4 justify-items-center',
            {
                'animate-sliding-from-right-to-left': previousPageNum.current <= page,
                'animate-sliding-from-left-to-right': previousPageNum.current > page,
            }
        );

        content = <div className={classes}>{renderedNews}</div>;
    }
    const newsCount = data?.articles?.[api]?.count || newsListData.count || 0;

    return (
        <div className="mb-7">
            <div
                className={`flex justify-between capitalize text-2xl italic mt-8 ${articleColors[api].imageFilterBg} rounded-2xl px-3 py-1`}
            >
                {apiData?.apis?.find((apiData) => apiData.value === api)?.name || api}

                {newsCount > ITEMS_PER_API && (
                    <nav className="flex items-center">
                        <Button onClick={() => handleNavigationArrows('previous')} disabled={page <= 1 || isFetching}>
                            <MdOutlineKeyboardArrowLeft className="cursor-pointer" />
                        </Button>
                        <Button
                            onClick={() => handleNavigationArrows('next')}
                            disabled={
                                page >=
                                    Math.ceil(
                                        (data?.articles?.[api]?.count || newsListData.count || 0) / ITEMS_PER_API
                                    ) || isFetching
                            }
                        >
                            <MdOutlineKeyboardArrowRight className="cursor-pointer" />
                        </Button>
                    </nav>
                )}
            </div>
            {content}
        </div>
    );
};

export default NewsListPart;
