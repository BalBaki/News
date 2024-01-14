import { useFetchFiltersQuery } from '../../../../store';
import Sources from './Sources';

export const NEWS_API_NAME = 'newsapi';

const NewsApiFilters: React.FC = () => {
    const { data, isLoading, error } = useFetchFiltersQuery({ apiNames: ['newsapi'] });

    return (
        <>
            <Sources />
        </>
    );
};

export default NewsApiFilters;
