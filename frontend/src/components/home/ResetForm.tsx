import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { type FilterSettings } from '../../types';
import { useLogoutMutation } from '../../store';
import { LOGOUT_MUTATION_CACHE_KEY } from '../../utils/constants';

const defaultFormValues: FilterSettings = {
    term: '',
    fromDate: '',
    toDate: new Date().toISOString().split('T')[0],
    apiNames: [],
    extraFilters: {},
    sortOrder: 'relevance',
    page: 1,
};

const ResetForm: React.FC = () => {
    const { setValues } = useFormikContext<FilterSettings>();
    const [, { data }] = useLogoutMutation({
        fixedCacheKey: LOGOUT_MUTATION_CACHE_KEY,
    });

    useEffect(() => {
        if (data?.logout) {
            setValues(defaultFormValues);
        }
    }, [data]);

    return <></>;
};

export default ResetForm;
