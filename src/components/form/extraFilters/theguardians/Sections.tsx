import { Field, useFormikContext } from 'formik';
import { useFetchFiltersQuery } from '../../../../store';
import Loading from '../../../Loading';
import { type FilterSettings } from '../../../../types';
import Dropdown from '../../../Dropdown';
import { THE_GUARDIANS_API_NAME } from '../../../../utils/constants';

interface Section {
    id: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    editions: {
        id: string;
        webTitle: string;
        webUrl: string;
        apiUrl: string;
        code: string;
    }[];
}

const Sections: React.FC = () => {
    const { data, isLoading, error } = useFetchFiltersQuery({ apiNames: [THE_GUARDIANS_API_NAME] });
    const {
        values: { extraFilters },
    } = useFormikContext<FilterSettings>();

    let content;
    let selectedSection = extraFilters?.[THE_GUARDIANS_API_NAME]?.section;

    if (isLoading) content = <Loading />;
    else if (error || data?.error) content = <div>Error At Fetching sources</div>;
    else {
        const sections: Section[] = data?.filters?.[THE_GUARDIANS_API_NAME]?.sections?.response?.results;

        content = [{ id: '', webTitle: 'all' }, ...sections].map((section) => {
            return (
                <div key={section.id} className="flex items-center m-1">
                    <Field
                        type="radio"
                        name={`extraFilters.${THE_GUARDIANS_API_NAME}.section`}
                        id={section.id}
                        value={section.id}
                        className="ml-1"
                    />
                    <label className="pl-2" htmlFor={section.id}>
                        {section.webTitle}
                    </label>
                </div>
            );
        });
    }

    return (
        <div className="w-full max-sm:mx-auto max-[340px]:w-full max-sm:mt-1">
            <Dropdown placeholder={selectedSection || 'Sections For Guardians'}>{content}</Dropdown>
        </div>
    );
};

export default Sections;
