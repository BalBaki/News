import { useFormikContext } from 'formik';
import { type FilterSettings } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

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
