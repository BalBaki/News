import { useFetchFiltersQuery } from '../../../../store';
import Sections from './Sections';

const TheGuardiansFilter: React.FC = () => {
    const { data, isLoading, error } = useFetchFiltersQuery({ apiName: 'theguardians' });

    return (
        <>
            <Sections />
        </>
    );
};

export default TheGuardiansFilter;
