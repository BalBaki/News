import { Field, useFormikContext } from 'formik';
import { useFetchFiltersQuery } from '../../../../store';
import Loading from '../../../Loading';
import type { FilterSettings } from '../../../../types';
import Dropdown from '../../../Dropdown';
import { NEWS_API_NAME } from '../../../../utils/constants';

interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

const checkedSourceLimit = 20;

const Sources: React.FC = () => {
    const { data, isLoading, error } = useFetchFiltersQuery({ apiNames: [NEWS_API_NAME] });
    const {
        values: { extraFilters },
    } = useFormikContext<FilterSettings>();

    let content;

    if (isLoading) content = <Loading />;
    else if (error || data?.error) content = <div>Error At Fetching sources</div>;
    else {
        const selectedSources: string[] = extraFilters?.[NEWS_API_NAME]?.sources || [];
        const sources: Source[] = data?.filters?.[NEWS_API_NAME]?.sources?.sources;

        content = sources.map((source) => {
            return (
                <div key={source.id} className="flex items-center m-1">
                    <Field
                        type="checkbox"
                        name={`extraFilters.${NEWS_API_NAME}.sources`}
                        id={source.id}
                        value={source.id}
                        className="ml-1"
                        disabled={selectedSources.length >= checkedSourceLimit && !selectedSources.includes(source.id)}
                    />
                    <label className="pl-2" htmlFor={source.id}>
                        {source.name}
                    </label>
                </div>
            );
        });
    }

    return (
        <div className="w-full max-sm:mx-auto max-[340px]:w-full ">
            <Dropdown placeholder="Sources For NewsApi">{content}</Dropdown>
        </div>
    );
};

export default Sources;
