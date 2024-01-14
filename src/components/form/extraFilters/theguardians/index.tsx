import { useFetchFiltersQuery } from '../../../../store';
import Sections from './Sections';
import { THE_GUARDIANS_API_NAME } from '../../../../utils/constants';

const TheGuardiansFilters: React.FC = () => {
    const { data, isLoading, error } = useFetchFiltersQuery({ apiNames: [THE_GUARDIANS_API_NAME] });

    return (
        <>
            <Sections />
        </>
    );
};

export default TheGuardiansFilters;
