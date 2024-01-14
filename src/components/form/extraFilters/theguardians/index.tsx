import { useFetchFiltersQuery } from '../../../../store';
import Sections from './Sections';

export const THE_GUARDIANS_API_NAME = 'theguardians';

const TheGuardiansFilters: React.FC = () => {
    const { data, isLoading, error } = useFetchFiltersQuery({ apiNames: [THE_GUARDIANS_API_NAME] });

    return (
        <>
            <Sections />
        </>
    );
};

export default TheGuardiansFilters;
