import { useFormikContext } from 'formik';
import ReactDatePicker from 'react-datepicker';
import { FaRegCalendar } from 'react-icons/fa';
import { type FilterSettings } from '../../types';

const Dates: React.FC = () => {
    const { values, setFieldValue } = useFormikContext<FilterSettings>();

    return (
        <div className="flex justify-around xl:justify-evenly items-baseline w-full max-[350px]:block ">
            <div className="flex items-center">
                <div className="max-[350px]:w-12 max-[350px]:mr-0 mr-3">
                    <label htmlFor="fromDate">From: </label>
                </div>
                <ReactDatePicker
                    selected={
                        values.fromDate && new Date(values.fromDate) < new Date(values.toDate)
                            ? new Date(values.fromDate)
                            : undefined
                    }
                    onChange={(date) => {
                        setFieldValue('fromDate', date);
                    }}
                    className="rounded-md w-[7.5rem] cursor-pointer text-center !py-0.5 !pr-3 border-2 bg-black text-white"
                    // showIcon
                    // icon={<FaRegCalendar className="!p-0 top-1/4 left-1.5 !w-4 !h-4" />}
                    maxDate={new Date(values.toDate)}
                    isClearable
                    clearButtonClassName="after:!pb-0 after:!px-0 after:!pt-0 animate-fade-in !pr-1.5 after:!bg-white after:!text-black"
                />
            </div>
            <div className="flex items-center min-[351px]:ml-2 max-[350px]:mt-2">
                <div className="max-[350px]:w-12 mr-3 max-[350px]:mr-0">
                    <label htmlFor="toDate">To: </label>
                </div>
                <ReactDatePicker
                    selected={new Date(values.toDate) || new Date()}
                    onChange={(date) => setFieldValue('toDate', date)}
                    minDate={new Date(values.fromDate)}
                    className="rounded-md w-[7.5rem] text-center cursor-pointer !py-0.5 border-2 bg-black text-white"
                    // showIcon
                    // icon={<FaRegCalendar className="!p-0 top-1/4 left-1.5 !w-4 !h-4" />}
                    maxDate={new Date()}
                />
            </div>
        </div>
    );
};

export default Dates;
