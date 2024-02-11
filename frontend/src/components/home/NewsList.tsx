import './NewsList.css';
import Loading from '../Loading';
import NewsListPart from './NewsListPart';
import Error from '../Error';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type SerializedError } from '@reduxjs/toolkit';
import { type SearchResponse } from '../../types';

type NewsListTypes = {
    searchResult: {
        data: SearchResponse | undefined;
        isFetching: boolean;
        error: FetchBaseQueryError | SerializedError | undefined;
    };
};

const NewsList: React.FC<NewsListTypes> = ({ searchResult }) => {
    const { data, error, isFetching } = searchResult;

    if (isFetching)
        return (
            <div className="h-64">
                <Loading />
            </div>
        );
    if (error || data?.error) return <Error className="mt-9">Error At Fetching News</Error>;

    return (
        <section className="mt-6 mx-1 min-[281px]:mx-3" aria-label="news">
            {data?.search ? (
                Object.keys(data.articles).length > 0 ? (
                    <>
                        {Object.keys(data.articles).map((api) => {
                            return <NewsListPart key={api} api={api} newsListData={data.articles[api]} />;
                        })}
                    </>
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
