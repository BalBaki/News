import { useFetchFiltersQuery } from '../../../../store';
import Sources from './Sources';
import { NEWS_API_NAME } from '../../../../utils/constants';

const NewsApiFilters: React.FC = () => {
    const { data, isLoading, error } = useFetchFiltersQuery({ apiNames: [NEWS_API_NAME] });

    return (
        <>
            <Sources />
        </>
    );
};

export default NewsApiFilters;
