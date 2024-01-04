import { useFormikContext } from 'formik';
import { type FilterSettings } from '../../types';
import { useFetchApisQuery } from '../../store';
import { useEffect } from 'react';

const ExtraFilters: React.FC = () => {
    const { values, setValues } = useFormikContext<FilterSettings>();
    const { data } = useFetchApisQuery();

    useEffect(() => {
        values.apiNames.forEach((api) => {
            if (!values.extraFilters[api]) {
                values.extraFilters[api] = {};

                const apiData = data?.apis?.find((resApi) => resApi.name === api);

                if (apiData) {
                    apiData.filters.forEach((filterName) => (values.extraFilters[api][filterName] = ''));
                }
            }
        });

        Object.keys(values.extraFilters).forEach((key) => {
            if (!values.apiNames.includes(key)) delete values.extraFilters[key];
        });

        setValues(values);
    }, [values.apiNames]);

    return <div></div>;
};

export default ExtraFilters;
