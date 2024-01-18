import { useFetchFiltersQuery } from '../../../../store';
import Sources from './Sources';
import { NEWS_API_NAME } from '../../../../utils/constants';

const NewsApiFilters: React.FC = () => {
    useFetchFiltersQuery({ apiNames: [NEWS_API_NAME] });

    return (
        <>
            <Sources />
        </>
    );
};

export default NewsApiFilters;
