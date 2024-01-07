import { useFormikContext } from 'formik';
import type { FilterSettings } from '../../../types';
import NewsApiFilters from './newsapi';
import TheGuardiansFilters from './theguardians';
import { Fragment } from 'react';

interface FiltersWithElements {
    [key: string]: JSX.Element;
}

const filters: FiltersWithElements = {
    newsapi: <NewsApiFilters />,
    theguardians: <TheGuardiansFilters />,
};

const ExtraFilters: React.FC = () => {
    const { values } = useFormikContext<FilterSettings>();

    const renderedFilters = values.apiNames.map((apiName) => {
        return <Fragment key={apiName}>{filters[apiName]}</Fragment>;
    });

    return <>{renderedFilters}</>;
};

export default ExtraFilters;
