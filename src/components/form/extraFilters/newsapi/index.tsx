import { useFetchFiltersQuery } from '../../../../store';
import Sources from './Sources';

const NewsApiFilters: React.FC = () => {
    const { data, isLoading, error } = useFetchFiltersQuery({ apiName: 'newsapi' });

    return (
        <>
            <Sources />
        </>
    );
};

export default NewsApiFilters;
