import { useFormikContext } from 'formik';
import { useEffect } from 'react';

type ResetFormikFieldsProps = {
    fields: string | string[];
    condition: any;
    isLoading?: boolean;
};

const ResetFormikFields: React.FC<ResetFormikFieldsProps> = ({ fields, condition, isLoading }) => {
    const { values, setValues, initialValues, setTouched, dirty } = useFormikContext<any>();

    useEffect(() => {
        if (!isLoading && dirty) {
            const fieldsAsArray = typeof fields === 'string' ? [fields] : fields;

            fieldsAsArray.forEach((field) => {
                if (Object.keys(values).includes(field)) {
                    values[field] = initialValues[field];
                }
            });

            setValues(values);
            setTouched({});
        }
    }, [condition, isLoading]);

    return <></>;
};

export default ResetFormikFields;
