import { useEffect, Fragment } from 'react';
import { useFormikContext } from 'formik';
import { useFetchApisQuery } from '../../../store';
import NewsApiFilters from './newsapi';
import TheGuardiansFilters from './theguardians';
import { type FilterSettings } from '../../../types';
import { NEWS_API_VALUE, THE_GUARDIANS_API_VALUE } from '../../../utils/constants';

interface FiltersWithComponents {
    [key: string]: JSX.Element;
}

const filters: FiltersWithComponents = {
    [NEWS_API_VALUE]: <NewsApiFilters />,
    [THE_GUARDIANS_API_VALUE]: <TheGuardiansFilters />,
};

const ExtraFilters: React.FC = () => {
    const { values, setValues } = useFormikContext<FilterSettings>();
    const { data } = useFetchApisQuery();

    useEffect(() => {
        values.apiList.forEach((api) => {
            if (!values.extraFilters[api]) {
                values.extraFilters[api] = {};

                const apiData = data?.apis?.find((resApi) => resApi.name === api);

                if (apiData) {
                    apiData.filters.forEach((filter) => {
                        values.extraFilters[api][filter.name] = filter.defaultValue;
                    });
                }
            }
        });

        Object.keys(values.extraFilters).forEach((key) => {
            if (!values.apiList.includes(key)) delete values.extraFilters[key];
        });

        setValues(values);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.apiList]);

    const renderedFilters = values.apiList.map((api) => {
        return <Fragment key={api}>{filters[api]}</Fragment>;
    });

    return <>{renderedFilters}</>;
};

export default ExtraFilters;
