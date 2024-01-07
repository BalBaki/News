import { useFetchFiltersQuery } from '../../../../store';
import Sections from './Sections';

const TheGuardiansFilters: React.FC = () => {
    const { data, isLoading, error } = useFetchFiltersQuery({ apiName: 'theguardians' });

    return (
        <>
            <Sections />
        </>
    );
};

export default TheGuardiansFilters;
