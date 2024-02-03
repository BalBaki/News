import { useFetchFiltersQuery } from '../../../../store';
import Sources from './Sources';
import { NEWS_API_VALUE } from '../../../../utils/constants';

const NewsApiFilters: React.FC = () => {
    useFetchFiltersQuery({ apiList: [NEWS_API_VALUE] });

    return (
        <>
            <Sources />
        </>
    );
};

export default NewsApiFilters;
