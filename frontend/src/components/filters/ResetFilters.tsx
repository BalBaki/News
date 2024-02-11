import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { type FilterSettings } from '../../types';
import { useLogoutMutation } from '../../store';
import { LOGOUT_MUTATION_CACHE_KEY } from '../../utils/constants';

const defaultFormValues: FilterSettings = {
    term: '',
    fromDate: '',
    toDate: new Date(),
    apiList: [],
    extraFilters: {},
    sortOrder: 'relevance',
    page: 1,
};

const ResetFilters: React.FC = () => {
    const { setValues } = useFormikContext<FilterSettings>();
    const [, { data }] = useLogoutMutation({
        fixedCacheKey: LOGOUT_MUTATION_CACHE_KEY,
    });

    useEffect(() => {
        data?.logout && setValues(defaultFormValues);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return <></>;
};

export default ResetFilters;
