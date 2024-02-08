import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useSearchParams } from 'react-router-dom';
import { type FilterSettings } from '../../types';

const SetQueryParams: React.FC = () => {
    const { values } = useFormikContext<FilterSettings>();
    const [, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams(
            { filter: encodeURIComponent(JSON.stringify(values)) },
            {
                replace: true,
            }
        );
    }, [values]);

    return <></>;
};

export default SetQueryParams;
