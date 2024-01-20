import { useEffect, Fragment } from 'react';
import { useFormikContext } from 'formik';
import { useFetchApisQuery } from '../../../store';
import { type FilterSettings } from '../../../types';
import NewsApiFilters from './newsapi';
import TheGuardiansFilters from './theguardians';
import { NEWS_API_NAME, THE_GUARDIANS_API_NAME } from '../../../utils/constants';

interface FiltersWithElements {
    [key: string]: JSX.Element;
}

const filters: FiltersWithElements = {
    [NEWS_API_NAME]: <NewsApiFilters />,
    [THE_GUARDIANS_API_NAME]: <TheGuardiansFilters />,
};

const ExtraFilters: React.FC = () => {
    const { values, setValues } = useFormikContext<FilterSettings>();
    const { data } = useFetchApisQuery();

    useEffect(() => {
        values.apiNames.forEach((api) => {
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
            if (!values.apiNames.includes(key)) delete values.extraFilters[key];
        });

        setValues(values);
    }, [values.apiNames]);

    const renderedFilters = values.apiNames.map((apiName) => {
        return <Fragment key={apiName}>{filters[apiName]}</Fragment>;
    });

    return <>{renderedFilters}</>;
};

export default ExtraFilters;
