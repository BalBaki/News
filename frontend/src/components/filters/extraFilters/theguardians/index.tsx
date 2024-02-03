import { useFetchFiltersQuery } from '../../../../store';
import Sections from './Sections';
import { THE_GUARDIANS_API_VALUE } from '../../../../utils/constants';

const TheGuardiansFilters: React.FC = () => {
    useFetchFiltersQuery({ apiList: [THE_GUARDIANS_API_VALUE] });

    return (
        <>
            <Sections />
        </>
    );
};

export default TheGuardiansFilters;
