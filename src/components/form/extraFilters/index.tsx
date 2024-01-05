import { useFormikContext } from 'formik';
import type { FilterSettings } from '../../../types';
import NewsApiFilters from './newsapi';
import TheGuardiansFilter from './theguardians';

interface FiltersWithElements {
    [key: string]: JSX.Element;
}

const filters: FiltersWithElements = {
    newsapi: <NewsApiFilters />,
    theguardians: <TheGuardiansFilter />,
};

const ExtraFilters: React.FC = () => {
    const { values } = useFormikContext<FilterSettings>();

    const renderedFilters = values.apiNames.map((apiName) => {
        return <div key={apiName}>{filters[apiName]}</div>;
    });

    return <div>{renderedFilters}</div>;
};

export default ExtraFilters;
