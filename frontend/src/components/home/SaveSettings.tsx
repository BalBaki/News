import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { type FilterSettings } from '../../types';
import { useSaveSettingsMutation } from '../../store';
import Button from '../Button';
import { useNotification } from '../../hooks/use-notification';

const SaveSettings: React.FC = () => {
    const { values } = useFormikContext<FilterSettings>();
    const [saveSettings, { data: result, isLoading }] = useSaveSettingsMutation();
    const notification = useNotification();

    useEffect(() => {
        if (result) {
            notification({
                type: result?.save ? 'success' : 'error',
                message: result?.save ? 'Settings Saved' : result?.error,
            });
        }
    }, [result]);

    const handleSaveClick = (): void => {
        const { term, page, ...rest } = values;

        saveSettings(rest);
    };

    return (
        <Button
            className="bg-green-400 w-32 h-7 rounded-md text-white"
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSaveClick}
        >
            Save
        </Button>
    );
};

export default SaveSettings;
