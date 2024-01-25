import { useFormikContext } from 'formik';
import { useEffect } from 'react';

type ResetFormikFieldsType = {
    fields: string | string[];
    condition: any;
    isLoading?: boolean;
};

const ResetFormikFields: React.FC<ResetFormikFieldsType> = ({ fields, condition, isLoading }) => {
    const { values, setValues, initialValues, setTouched } = useFormikContext<any>();

    useEffect(() => {
        if (!isLoading) {
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
